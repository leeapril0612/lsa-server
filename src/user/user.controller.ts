import { Body, Controller, Get, Logger, Post, Request, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ValidationError } from 'Joi';
import { AuthService } from 'src/auth/auth.service';

import { Response, ResponseMessage } from '../util/response.util';
import { registerSchema } from './user.schema';
import { UserService } from './user.service';
import { Register, UserInfo } from './user.type';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) { }

  @UseGuards(AuthGuard('jwt'))
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
  public async login(@Res({ passthrough: true }) response, @Request() req): Promise<Response> {
    const access_token = await (await this.authService.generateToken(req.user)).access_token;
    await response.cookie('Authorization', access_token);
    return new ResponseMessage().success().body({
      token: access_token
    }).build();
  }


  @UseGuards(AuthGuard('jwt'))
  @Get('list')
  public async getUsers(@Res({ passthrough: true }) response, @Request() req): Promise<Response> {
    const users = await this.userService.getUsers()
    return new ResponseMessage().success().body(users).build();
  }
}
