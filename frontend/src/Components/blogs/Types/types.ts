export type Blog = {
  id?: number | undefined;
  description: string;
  userId?: number;
  createdAt?: any;
  'User.login'?: string;
};
export type State = {
  blogs: Blog[];
  message: undefined | string;
};

export type BlogId = Blog['id'];
