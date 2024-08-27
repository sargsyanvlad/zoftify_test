import { User } from './entities/user.entity';

const userResponseSerializer = (user: User) => {
  delete user?.password;
  delete user?.previousPassword;
  delete user?.__entity;
};

export default userResponseSerializer;
