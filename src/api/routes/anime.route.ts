import {
  AnimeCreateDto,
  AnimeUpdateDto,
} from "../../interfaces/anime.interface";
import AnimeService from "../../services/anime.service";
import { Router, Request, Response } from "express";
import Container from "typedi";
const route = Router();

export default (app: Router) => {
  app.use("/anime", route);

  const animeServiceInstance = Container.get(AnimeService);

  //Get All Anime
  route.get("/", async (req: Request, res: Response) => {
    try {
      await animeServiceInstance
        .findAllAnime()
        .then((anime) => res.status(200).json(anime))
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      res.status(400).json(error);
    }
  });

  //Get Airing Animes
  route.get("/airing/full", async (req: Request, res: Response) => {
    try {
      await animeServiceInstance
        .getAiringAnimes()
        .then((anime) => res.status(200).json(anime))
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      res.status(400).json(error);
    }
  });

  //Get Anime by Id
  route.get("/:id", async (req: Request, res: Response) => {
    try {
      await animeServiceInstance
        .findAnimeById(req.params.id)
        .then((anime) => res.status(200).json(anime))
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      res.status(400).json(error);
    }
  });

  //ADD new Anime
  route.post("/", async (req: Request, res: Response) => {
    try {
      await animeServiceInstance
        .saveAnime(req.body as AnimeCreateDto)
        .then((anime) => res.status(200).json(anime))
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      res.status(400).json(error);
    }
  });

  //Change Airing Status of All Animes
  route.get("/airingAll/:value", async (req: Request, res: Response) => {
    const status = req.params.value === "true";
    try {
      await animeServiceInstance
        .changeAiringStatusAll(status)
        .then((anime) => res.status(200).json(anime))
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      res.status(400).json(error);
    }
  });

  //Delete Anime
  route.delete("/:id", async (req: Request, res: Response) => {
    try {
      await animeServiceInstance
        .removeAnime(req.params.id)
        .then((anime) => res.status(200).json(anime))
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      res.status(400).json(error);
    }
  });

  //Update Anime
  route.put("/", async (req: Request, res: Response) => {
    try {
      await animeServiceInstance
        .updateAnime(req.body as AnimeUpdateDto)
        .then((anime) => res.status(200).json(anime))
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      res.status(400).json(error);
    }
  });
};
