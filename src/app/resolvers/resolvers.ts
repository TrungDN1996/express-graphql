import {
  allUsers,
  user,
  addUser,
  updateUser,
  deleteUser
} from "../modules/users/user.resolver";
import { 
  login, 
  changePassword 
} from "../modules/auth/auth.resolver";

export const resolvers = {
  Query: {
    allUsers,
    user
  },
  Mutation: {
     addUser,
     updateUser,
     deleteUser,
     login,
     changePassword
  }
};
