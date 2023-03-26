export interface UserDao {
  id: string;
  created: string;
  modified: string;
  email: string;
  password: string;
}

export type UserDto = Omit<UserDao, "password">;
