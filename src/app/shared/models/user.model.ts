export interface User {

  id?: string;

  username: string;
  email: string;
  role: string;
  password?: string;
  confirmEmail?: string;
  confirmPassword?: string;

  token?: string;
};
