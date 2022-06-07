import { Router, Request, Response } from "express";
import Container from "typedi";

import {
  AnimeCreateDto,
  AnimeUpdateDto,
} from "../../interfaces/anime.interface";
import AnimeService from "../../services/anime.service";
import { formatAnimeReturn } from "../../utils/format.util";

const route = Router();

export default (app: Router) => {
  app.use("/anime", route);

  const animeServiceInstance = Container.get(AnimeService);

  //Get All Anime
  route.get("/", (req: Request, res: Response) => {
    animeServiceInstance
      .findAllAnime()
      .then((anime) => {
        res.status(200).json(anime.map((anime) => formatAnimeReturn(anime)));
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  });

  //Get Airing Animes
  route.get("/airing/full", (req: Request, res: Response) => {
    animeServiceInstance
      .getAiringAnimes()
      .then((anime) => res.status(200).json(anime))
      .catch((error) => {
        res.status(400).json(error);
      });
  });

  //Get Anime by Id
  route.get("/:id", (req: Request, res: Response) => {
    animeServiceInstance
      .findAnimeById(req.params.id)
      .then((anime) => res.status(200).json(anime))
      .catch((error) => {
        res.status(400).json(error);
      });
  });

  //ADD new Anime
  route.post("/", (req: Request, res: Response) => {
    animeServiceInstance
      .saveAnime(req.body as AnimeCreateDto)
      .then((anime) => res.status(200).json(anime))
      .catch((error) => {
        res.status(400).json(error);
      });
  });

  //Change Airing Status of All Animes
  route.get("/airingAll/:value", (req: Request, res: Response) => {
    const status = req.params.value === "true";
    animeServiceInstance
      .changeAiringStatusAll(status)
      .then((anime) => res.status(200).json(anime))
      .catch((error) => {
        res.status(400).json(error);
      });
  });

  //Delete Anime
  route.delete("/:id", (req: Request, res: Response) => {
    animeServiceInstance
      .removeAnime(req.params.id)
      .then((anime) => res.status(200).json(anime))
      .catch((error) => {
        res.status(400).json(error);
      });
  });

  //Update Anime
  route.put("/", (req: Request, res: Response) => {
    animeServiceInstance
      .updateAnime(req.body as AnimeUpdateDto)
      .then((anime) => res.status(200).json(anime))
      .catch((error) => {
        res.status(400).json(error);
      });
  });
};
