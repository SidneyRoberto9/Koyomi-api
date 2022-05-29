import { AnimeModelI } from "../interfaces/anime.interface";
import { Schema, model } from "mongoose";

export const AnimeSchema = new Schema({
  title: { type: String, required: true, unique: true },
  image: { type: String },
  date: { type: Object },
  episodes: { type: Number },
  externalLinks: { type: Array },
});

export const AnimeModel = model<AnimeModelI>("Animes", AnimeSchema);
