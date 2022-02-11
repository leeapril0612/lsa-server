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

    async isUser(username) {
        const user = await this.userService.getUser(username);
        return user;
    }
    async validateUser(username: string, password: string): Promise<LoginUserInfo> {
        const user = await this.userService.login({
            username,
            password,
        });
        if (user) {
            return user;
        }
        return null;
    }

    async generateToken(user: LoginUserInfo) {
        
        const payload = { ...user };
        return { access_token: this.jwtService.sign(payload) };
    }
}
