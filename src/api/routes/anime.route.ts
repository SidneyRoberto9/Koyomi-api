import { NextFunction, Request, Response, Router } from 'express';
import Container from 'typedi';

import { AnimeCreateDto, AnimeUpdateDto } from '../../interfaces/anime.interface';
import AnimeService from '../../services/anime.service';
import { formatAnimeReturn } from '../../utils/format.util';

const route = Router();

export default (app: Router) => {
  app.use('/anime', route);

  const animeServiceInstance = Container.get(AnimeService);

  //Get All Anime
  route.get('/', (req: Request, res: Response, next: NextFunction) => {
    animeServiceInstance
      .findAllAnime()
      .then((anime) => {
        res.status(200).json(anime.map((anime) => formatAnimeReturn(anime)));
      })
      .catch((error) => {
        next(error);
      });
  });

  //Get Airing Animes
  route.get(
    '/airing/full',
    (req: Request, res: Response, next: NextFunction) => {
      animeServiceInstance
        .getAiringAnimes()
        .then((anime) => res.status(200).json(anime))
        .catch((error) => {
          next(error);
        });
    }
  );

  //Get Anime by Id
  route.get('/:id', (req: Request, res: Response, next: NextFunction) => {
    animeServiceInstance
      .findAnimeById(req.params.id)
      .then((anime) => res.status(200).json(anime))
      .catch((error) => {
        next(error);
      });
  });

  //ADD new Anime
  route.post('/', (req: Request, res: Response, next: NextFunction) => {
    animeServiceInstance
      .saveAnime(req.body as AnimeCreateDto)
      .then((anime) => res.status(200).json(anime))
      .catch((error) => {
        next(error);
      });
  });

  //Change Airing Status of All Animes
  route.get(
    '/airingAll/:value',
    (req: Request, res: Response, next: NextFunction) => {
      const status = req.params.value === 'true';
      animeServiceInstance
        .changeAiringStatusAll(status)
        .then((anime) => res.status(200).json(anime))
        .catch((error) => {
          next(error);
        });
    }
  );

  //Delete Anime
  route.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
    animeServiceInstance
      .removeAnime(req.params.id)
      .then((anime) => res.status(200).json(anime))
      .catch((error) => {
        next(error);
      });
  });

  //Update Anime
  route.put('/', (req: Request, res: Response, next: NextFunction) => {
    animeServiceInstance
      .updateAnime(req.body as AnimeUpdateDto)
      .then((anime) => res.status(200).json(anime))
      .catch((error) => {
        next(error);
      });
  });
};
