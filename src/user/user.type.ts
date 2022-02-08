// 데이터 타입 모음

export type Login = {
  username: string;
  password: string;
};

export type Register = {
  username: string;
  name: string;
  password: string;
};

export type UserInfo = {
  uuid: string;
  username: string;
  name: string;
};

export type JwtPayload = {
  username: string;
  name: string;
  lastLoginDate: string;
};

export type LoginUserInfo = {
  uuid: string;
  username: string;
  name: string;
  lastLogin: Date;
};
