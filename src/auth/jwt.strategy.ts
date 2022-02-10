import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { LoginUserInfo } from 'src/user/user.type';

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
    constructor() {
        super({
            // jwtFromRequest: ExtractJwt.fromHeader('Authorization'),
            jwtFromRequest: fromAuthCookie(),
            ignoreExpiration: false,
            secretOrKey: 'lsa',
        });
    }

    async validate(payload: LoginUserInfo) {
        return { ...payload };
    }
}