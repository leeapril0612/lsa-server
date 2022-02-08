import { Body, Controller, Header, Logger, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ValidationError } from 'Joi';
import { AuthService } from 'src/auth/auth.service';

import { Response, ResponseMessage } from '../util/response.util';
import { loginSchema, registerSchema } from './user.schema';
import { UserService } from './user.service';
import { Login, Register, UserInfo } from './user.type';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) { }

  @Post('register')
  public async addUser(@Body() register: Register): Promise<Response> {
    try {
      const { value, error }: { value: Register; error?: ValidationError } =
        registerSchema.validate(register);

      if (error) {
        Logger.error(error);
        return new ResponseMessage().error(999).body('Parameter Error').build();
      }

      const user: UserInfo = await this.userService.addUser(value);

      return new ResponseMessage().success().body(user).build();
    } catch (err) {
      Logger.error(err);
    }
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  public async login(@Body() login: Login): Promise<Response> {
    console.log(login);
    // const { value, error }: { value: Login; error?: ValidationError } = loginSchema.validate(login);

    // if (error) {
    //   Logger.error(error);
    //   return new ResponseMessage().error(999).body('Parameter Error').build();
    // }

    const user = await this.userService.login(login);

    if (!user) {
      return new ResponseMessage().error(999, 'Login Error').build();
    }
    const token = await this.authService.generateToken(user);

    return new ResponseMessage().success().body({
      token : token.access_token
    }).build();
  }
}
