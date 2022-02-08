import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginUserInfo } from 'src/user/user.type';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }

    async validateUser(username: string, password: string): Promise<boolean> {
        const user = await this.userService.login({
            username,
            password,
        });
        if (user) {
            return true;
        }
        return false;
    }

    async generateToken(user: LoginUserInfo) {
        const payload = { username: user.username };
        return { access_token: this.jwtService.sign(payload) };
    }
}
