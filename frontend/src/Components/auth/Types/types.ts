export type User = {
  id?: number;
  login?: string;
  email: string;
  password: string;
};
export type State = {
  user: User | {};
  message: string | undefined;
};
