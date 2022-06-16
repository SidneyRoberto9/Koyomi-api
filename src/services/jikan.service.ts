import axios from 'axios';
import { Service } from 'typedi';

import { AnimeModelI } from '../interfaces/anime.interface';
import { formatJkArray } from '../utils/format.util';
import { formatJkGetAnimeByName } from './../utils/format.util';

@Service()
export default class JikanService {
  constructor() {}

  async getAnime(id: string) {
    const url: string = `https://api.jikan.moe/v4/anime/${id}/full`;

    try {
      return await axios
        .get(url)
        .then((data) => data.data.data)
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      throw error;
    }
  }

  async getAnimeByName(name: string) {
    const url: string = `https://api.jikan.moe/v4/anime?q=${name}&limit=1`;

    try {
      return await axios
        .get(url)
        .then(async (data) => await formatJkGetAnimeByName(data.data.data[0]))
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      throw error;
    }
  }

  async getRandomAnime() {
    const url: string = 'https://api.jikan.moe/v4/random/anime';

    try {
      return await axios
        .get(url)
        .then((data) => data.data.data)
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      throw error;
    }
  }

  async getRecommendations() {
    const url: string = 'https://api.jikan.moe/v4/recommendations/anime';

    try {
      return await axios
        .get(url)
        .then((data) => data.data.data)
        .catch((error) => error);
    } catch (error) {
      throw error;
    }
  }

  async getAnimesSeasonNow() {
    try {
      const url: string = 'https://api.jikan.moe/v4/seasons/now?page=';
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
      throw error;
    }
  }
}
