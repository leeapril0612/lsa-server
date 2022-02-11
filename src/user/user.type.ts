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
  username: string;
  name: string;
};

export type JwtPayload = {
  username: string;
  name: string;
  lastLogin: string;
  iat: number;
  exp: number;
};

export type LoginUserInfo = {
  username: string;
  name: string;
  lastLogin: Date;
};
