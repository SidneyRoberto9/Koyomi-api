import { Service } from "typedi";
import axios from "axios";

import { formatJk, formatJkArray } from "../utils/format.util";
import { AnimeModelI } from "../interfaces/anime.interface";

@Service()
export default class JikanService {
  constructor() {}

  public async getAnime(id: string) {
    const url: string = `https://api.jikan.moe/v4/anime/${id}/full`;
    try {
      return await axios
        .get(url)
        .then((data) => data.data.data)
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      throw error.message;
    }
  }

  public async getRandomAnime() {
    const url: string = "https://api.jikan.moe/v4/random/anime";

    try {
      return await axios
        .get(url)
        .then((data) => data.data.data)
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      throw error.message;
    }
  }

  public async getRecommendations() {
    const url: string = "https://api.jikan.moe/v4/recommendations/anime";

    try {
      return await axios
        .get(url)
        .then((data) => data.data.data)
        .catch((error) => error);
    } catch (error) {
      throw error.message;
    }
  }

  public async getAnimesSeasonNow() {
    try {
      const url: string = "https://api.jikan.moe/v4/seasons/now?page=";
      const animes: AnimeModelI[] = [];
      let empty: number = 0;
      let qtd: number = 0;

      for (let index = 1; empty === 0; index++) {
        await axios
          .get(url + index)
          .then((data) => {
            let content = data.data.data;
            content.length === 0 && empty++;
            qtd += content.length;
            animes.push(...formatJkArray(content));
          })
          .catch((error) => {
            throw error;
          });
      }

      return {
        qtd: qtd,
        data: animes,
      };
    } catch (error) {
      throw error.message;
    }
  }
}
