import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/user.entity';
import { Token } from 'src/util/token.util';
import { UserRepository } from './user.repository';
import * as Bcrypt from 'bcryptjs';
import { Login, LoginUserInfo, Register, UserInfo } from './user.type';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) { 
    this.addUser({
      username:'admin',
      name:'admin',
      password: '1234'
    })
  }

  public async getUser(username: string) {
    const users = await this.userRepository.findOne({
      select: ['username', 'name', 'lastLoginDate', 'createdDate', 'lastLoginDate'],
      where: {
        username:username
      }
    });
    return users;
  }

  public async getUsers() {
    const users = await this.userRepository.find({
      select: ['username', 'name', 'lastLoginDate', 'createdDate', 'lastLoginDate']
    });
    return users;
  }

  public async addUser(register: Register): Promise<UserInfo> {
    const registerUser = await this.userRepository.create();

    // Encode User Password
    const salt: string = await Bcrypt.genSalt(10);
    const password: string = await Bcrypt.hash(register.password, salt);

    registerUser.username = register.username;
    registerUser.name = register.name;
    registerUser.password = password;

    const user = await this.userRepository.save(registerUser);
    const userInfo: UserInfo = {
      username: user.username,
      name: user.name,
    };
    return userInfo;
  }

  public async login(loginUser: Login): Promise<LoginUserInfo> {
    const user: User = await this.userRepository.findOne({
      where: {
        username: loginUser.username,
      },
    });

    if (!user) {
      return null;
    }
    const passwordCheck = await Bcrypt.compare(
      loginUser.password,
      user.password,
    );

    if (!passwordCheck) {
      return null;
    }

    user.lastLoginDate = new Date();

    await this.userRepository.save(user);

    const userInfo: LoginUserInfo = {
      username: user.username,
      name: user.name,
      lastLogin: user.lastLoginDate,
    };

    return userInfo;
  }
}
