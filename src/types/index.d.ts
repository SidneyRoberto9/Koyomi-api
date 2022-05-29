import { Model } from "mongoose";
import { AnimeModelI } from "../interfaces/anime.interface";
import { userModelI } from "../interfaces/user.interface";

declare global {
  namespace Models {
    export type AnimeModel = Model<AnimeModelI>;
    export type UserModel = Model<userModelI>;
  }
}
