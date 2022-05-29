import { AnimeCreateDto, AnimeUpdateDto } from "../interfaces/anime.interface";
import { AnimeModel } from "../models/anime.model";
import { Inject, Service } from "typedi";

@Service()
export default class AnimeService {
  constructor(@Inject("animeModel") private animeModel: Models.AnimeModel) {
    this.animeModel = AnimeModel;
  }

  public async findAllAnime() {
    try {
      return await this.animeModel.find().catch(() => {
        throw new Error("No Anime Found!!");
      });
    } catch (error) {
      throw error.message;
    }
  }

  public async findAnimeById(id: string) {
    try {
      return await this.animeModel.find({ _id: id }).catch(() => {
        throw new Error(`Anime Not Found With This Id: ${id}`);
      });
    } catch (error) {
      throw error.message;
    }
  }

  public async getAiringAnimes() {
    try {
      return await this.animeModel.find({ "date.airing": true }).catch(() => {
        throw new Error("No Anime in Airing Found!!");
      });
    } catch (error) {
      throw error.message;
    }
  }

  public async saveAnime(AnimeCreateDto: AnimeCreateDto) {
    try {
      return await new this.animeModel(AnimeCreateDto)
        .save()
        .then(() => ({
          Result: `${AnimeCreateDto.title} Successfully Saved!!`,
        }))
        .catch(() => {
          throw new Error(`${AnimeCreateDto.title} Not Saved!!`);
        });
    } catch (error) {
      throw error.message;
    }
  }

  public async changeAiringStatusAll(status: boolean) {
    try {
      return await this.animeModel
        .find()
        .updateMany({}, { $set: { "date.airing": status } })
        .then(() => ({ Result: `All Anime Airing Status set ${status}!!` }))
        .catch(() => {
          throw new Error(`Change all Airing Status Failed!!`);
        });
    } catch (error) {
      throw error.message;
    }
  }

  public async removeAnime(id: string) {
    try {
      return await this.animeModel
        .findByIdAndDelete(id)
        .then(() => ({ message: `Deleting Anime With That Id: ${id}` }))
        .catch(() => {
          throw new Error(`Anime Not Found With This Id: ${id}`);
        });
    } catch (error) {
      throw error.message;
    }
  }

  public async updateAnime(animeUpdateDto: AnimeUpdateDto) {
    try {
      return await this.animeModel
        .updateOne({ _id: animeUpdateDto.id }, animeUpdateDto.anime)
        .then(() => ({
          message: `Updated Anime With this Name: ${animeUpdateDto.anime.title}`,
        }))
        .catch(() => {
          throw new Error(
            `Anime Not Found With This Name: ${animeUpdateDto.anime.title}`
          );
        });
    } catch (error) {
      throw error.message;
    }
  }
}
