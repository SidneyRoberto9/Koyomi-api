import { Inject, Service } from 'typedi';

import { AnimeCreateDto, AnimeUpdateDto } from '../interfaces/anime.interface';
import { AnimeModel } from '../models/anime.model';
import { isEmpty } from './../utils/format.util';

@Service()
export default class AnimeService {
  constructor(@Inject('animeModel') private animeModel: Models.AnimeModel) {
    this.animeModel = AnimeModel;
  }

  public async findAllAnime() {
    try {
      const animes = await this.animeModel.find();

      if (isEmpty(animes)) {
        throw new Error('No Anime Found!!');
      }

      return animes;
    } catch (error) {
      throw error.message;
    }
  }

  public async findAnimeById(id: string) {
    try {
      const anime = await this.animeModel.find({ _id: id });

      if (isEmpty(anime)) {
        throw new Error(`Anime Not Found With This Id: ${id}`);
      }

      return anime;
    } catch (error) {
      throw error.message;
    }
  }

  public async getAiringAnimes() {
    try {
      const airingAnime = await this.animeModel.find({ 'date.airing': true });

      if (isEmpty(airingAnime)) {
        throw new Error('No Anime in Airing Found!!');
      }

      return airingAnime;
    } catch (error) {
      throw error.message;
    }
  }

  public async saveAnime(AnimeCreateDto: AnimeCreateDto) {
    try {
      const anime = new this.animeModel(AnimeCreateDto).save();

      if (isEmpty(anime)) {
        throw new Error(`${AnimeCreateDto.title} Not Saved!!`);
      }

      return {
        Result: `${AnimeCreateDto.title} Successfully Saved!!`,
      };
    } catch (error) {
      throw error.message;
    }
  }

  public async changeAiringStatusAll(status: boolean) {
    try {
      const anime = await this.animeModel
        .find()
        .updateMany({}, { $set: { 'date.airing': status } });

      if (isEmpty(anime)) {
        throw new Error(`Change all Airing Status Failed!!`);
      }

      return { Result: `All Anime Airing Status set ${status}!!` };
    } catch (error) {
      throw error.message;
    }
  }

  public async removeAnime(id: string) {
    try {
      const anime = await this.animeModel.findByIdAndDelete(id);

      if (isEmpty(anime)) {
        throw new Error(`Anime Not Found With This Id: ${id}`);
      }

      return { message: `Deleting Anime With That Id: ${id}` };
    } catch (error) {
      throw error.message;
    }
  }

  public async updateAnime(animeUpdateDto: AnimeUpdateDto) {
    try {
      const anime = await this.animeModel.updateOne(
        { _id: animeUpdateDto.id },
        animeUpdateDto.anime
      );

      if (isEmpty(anime)) {
        throw new Error(
          `Anime Not Found With This Name: ${animeUpdateDto.anime.title}`
        );
      }

      return {
        message: `Updated Anime With this Name: ${animeUpdateDto.anime.title}`,
      };
    } catch (error) {
      throw error.message;
    }
  }
}
