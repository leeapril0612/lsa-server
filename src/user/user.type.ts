// 데이터 타입 모음

export type Login = {
  email: string;
  password: string;
};

export type Register = {
  email: string;
  name: string;
  password: string;
};

export type UserInfo = {
  uuid: string;
  email: string;
  name: string;
};

export type JwtPayload = {
  email: string;
  name: string;
  lastLoginDate: string;
};

export type LoginUserInfo = {
  uuid: string;
  email: string;
  name: string;
  lastLogin: Date;
};
