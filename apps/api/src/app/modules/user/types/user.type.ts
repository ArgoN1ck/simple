export type CreateUserParams = {
  username: string;
  email: string;
  password: string;
};

export type GetUserParams = {
  id: string;
};

export type GetUserByEmailParams = {
  email: string;
};
