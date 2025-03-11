export type TLoginUser = {
  email: string;
  password: string;
};

export type TRegistration = {
  name: string;
  email: string;
  number: string;
  password: string;
  role?: 'user' | 'admin';
  isBlocked?: boolean;
};
