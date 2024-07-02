export type SignUpParams = {
  email: string;
  username: string;
  password: string;
};

export type SignInParams = {
  email: string;
  password: string;
};

export type AuthenticationResult = {
  accessToken: string;
  expiresIn: number;
};
