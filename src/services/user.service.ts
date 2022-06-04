import { Inject, Service } from "typedi";
import { UserModel } from "../models/user.model";
import { formatUser } from "../utils/format.util";

@Service()
export default class UserService {
  constructor(@Inject("userModel") private userModel: Models.UserModel) {
    this.userModel = UserModel;
  }

  public async getAllUsers() {
    try {
      return await this.userModel
        .find()
        .then((user) => ({
          Result: "Successfully fetched all users",
          Users: user,
        }))
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      throw error.message;
    }
  }

  public async getUserById(id: string) {
    try {
      return await this.userModel
        .find({ _id: id })
        .then((user) => formatUser(user))
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      throw error.message;
    }
  }

  public async getRoleUser(id: string) {
    try {
      return await this.userModel
        .findById(id)
        .then((user) => ({
          Result: `Username: ${user.username} | role: ${user.role}`,
        }))
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      throw error.message;
    }
  }

  public async deleteUser(id: string) {
    try {
      return await this.userModel
        .findByIdAndDelete(id)
        .then(() => ({ Result: `Successfully delete ${id} user` }))
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      throw error.message;
    }
  }
}
