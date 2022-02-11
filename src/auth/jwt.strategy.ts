import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtPayload, LoginUserInfo } from 'src/user/user.type';
import { AuthService } from './auth.service';

const fromAuthCookie = function () {
    return function (request) {
        let token = null;
        if (request && request.cookies) {
            token = request.cookies['Authorization'];
        }
        return token;
    }
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            // jwtFromRequest: ExtractJwt.fromHeader('Authorization'),
            jwtFromRequest: fromAuthCookie(),
            ignoreExpiration: false,
            secretOrKey: 'lsa',
        });
    }

    async validate(payload: JwtPayload) {
        const user = this.authService.isUser(payload.username);
        if(!user){
            return null;
        }
        return { ...payload }
    }
}