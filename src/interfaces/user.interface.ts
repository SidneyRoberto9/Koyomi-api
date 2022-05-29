import { Document } from "mongoose";

export interface userModelI extends Document {
  username: string;
  email: string;
  password: string;
  profilePic: string;
  role: role;
}

export enum role {
  ADMIN = "ADMIN",
  DEFAULT = "DEFAULT",
}

export interface userCreateDto {
  username: string;
  email: string;
  password: string;
  profilePic?: string;
  role?: role;
}

export interface loginDto {
  email?: string;
  username?: string;
  password: string;
}
