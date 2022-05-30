import { Document } from "mongoose";
import { AnimeReturnDto } from "./anime.interface";

export interface AnimeWatched {
  anime: AnimeReturnDto;
  watchedEpisodes: number;
  watchedEpisodeWeek: boolean;
}

export enum role {
  ADMIN = "ADMIN",
  DEFAULT = "DEFAULT",
}

export interface userModelI extends Document {
  username: string;
  email: string;
  password: string;
  profilePic: string;
  role: role;
  animeWatched: AnimeWatched[];
}

export interface userCreateDto {
  username: string;
  email: string;
  password: string;
  profilePic?: string;
  role?: role;
  animeWatched?: AnimeWatched[];
}

export interface loginDto {
  email?: string;
  username?: string;
  password: string;
}
