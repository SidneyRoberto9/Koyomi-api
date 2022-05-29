import { Document } from "mongoose";

export interface link {
  name: string;
  url: string;
}

export interface animeDate {
  year: string;
  season: string;
  weekday: string;
  airing: boolean;
}

export interface AnimeModelI extends Document {
  title: string;
  image: string;
  date: animeDate;
  episodes: number;
  externalLinks: link[];
}

export interface AnimeCreateDto {
  title: string;
  image: string;
  date: animeDate;
  episodes: number;
  externalLinks: link[];
}

export interface AnimeUpdateDto {
  anime: AnimeModelI;
  id: string;
}
