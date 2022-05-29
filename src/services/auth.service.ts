import { decryptPassword, encryptPassword } from "../utils/validate.util";
import { loginDto, userCreateDto } from "../interfaces/user.interface";
import { formatUserToken } from "../utils/format.util";
import { UserModel } from "../models/user.model";
import { Inject, Service } from "typedi";
import { sign } from "jsonwebtoken";
import config from "../config";

const userProfilePicUrl =
  "https://lh5.googleusercontent.com/r9XqpnCbvNDA5e8zTpdDz0Vhg72eii8elDrc32BttO7QwSYk1xolXQUZAecGReAO_-Q_ow1vebnVlFnwW-aN=w1378-h797";

@Service()
export default class AuthService {
  constructor(@Inject("userModel") private userModel: Models.UserModel) {
    this.userModel = UserModel;
  }

  public async register(userDto: userCreateDto) {
    try {
      return await new this.userModel({
        password: encryptPassword(userDto.password),
        profilePic: userProfilePicUrl,
        ...userDto,
      })
        .save()
        .then(() => ({
          message: `User ${userDto.username} created successfully`,
        }));
    } catch (error) {
      throw error.message;
    }
  }

  public async login(loginDto: loginDto) {
    try {
      const user = await this.userModel.findOne({
        $or: [{ email: loginDto.email }, { username: loginDto.username }],
      });

      if (!user) throw new Error("Wrong Email or Username!!");

      const userJson = JSON.parse(JSON.stringify(user));
      const decryptedPassword = decryptPassword(user.password);

      if (decryptedPassword !== loginDto.password)
        throw new Error("Incorrect password");

      const accessToken = sign(
        { id: user._id, role: user.role },
        config.criptoKey,
        { expiresIn: "365d" }
      );

      return formatUserToken(userJson, accessToken);
    } catch (error) {
      throw error.message;
    }
  }
}
