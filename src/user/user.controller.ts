import { Body, Controller, Get, Header, Logger, Post, Request, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { ValidationError } from 'Joi';
import { AuthService } from 'src/auth/auth.service';

import { ResponseMessage, ResponseMessageBody } from '../util/response.util';
import { registerSchema } from './user.schema';
import { UserService } from './user.service';
import { Register, UserInfo } from './user.type';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) { }

  @Header('Content-Type', 'application/json')
  @UseGuards(AuthGuard('jwt'))
  @Post('register')
  public async addUser(@Body() register: Register): Promise<ResponseMessageBody> {
    try {
      const { value, error }: { value: Register; error?: ValidationError } = registerSchema.validate(register);

      if (error) {
        Logger.error(error);
        return new ResponseMessage().error(999).body('Parameter Error').build();
      }

      const user: UserInfo = await this.userService.addUser(value);

      return new ResponseMessage().success(201).body(user).build();
    } catch (err) {
      Logger.error(err);
    }
  }

  @Header('Content-Type', 'application/json')
  @UseGuards(AuthGuard('local'))
  @Post('login')
  public async login(@Res({ passthrough: true }) response: Response, @Request() req): Promise<ResponseMessageBody> {
    const access_token = await (await this.authService.generateToken(req.user)).access_token;
    await response.cookie('Authorization', access_token, {
      httpOnly: true,
      expires: new Date(Date.now() + 5 * 60 * 1000)
    });
    return new ResponseMessage().success().body({
      token: access_token
    }).build();
  }


  @UseGuards(AuthGuard('jwt'))
  @Get('list')
  public async getUsers(@Request() req): Promise<ResponseMessageBody> {
    const users = await this.userService.getUsers()
    return new ResponseMessage().success().body(users).build();
  }
}
