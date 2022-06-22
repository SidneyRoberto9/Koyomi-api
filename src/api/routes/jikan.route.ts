import { Request, Response, Router } from 'express';
import Container from 'typedi';

import JikanService from '../../services/jikan.service';

const route = Router();

export default (app: Router) => {
  app.use('/jk', route);

  const jkServiceInstance = Container.get(JikanService);

  //Get Anime By MAL ID
  route.get('/:id', async (req: Request, res: Response) => {
    try {
      await jkServiceInstance
        .getAnime(req.params.id)
        .then((jk) => res.status(200).json(jk))
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      return res.status(500).json(error);
    }
  });

  route.get('/anime/random', async (req: Request, res: Response) => {
    try {
      await jkServiceInstance
        .getRandomAnime()
        .then((jk) => res.status(200).json(jk))
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      return res.status(500).json(error);
    }
  });

  route.get(
    '/anime/recommend',
    async (req: Request, res: Response) => {
      try {
        await jkServiceInstance
          .getRecommendations()
          .then((jk) => res.status(200).json(jk))
          .catch((error) => {
            throw error;
          });
      } catch (error) {
        return res.status(500).json(error);
      }
    }
  );

  route.get(
    '/anime/season/now',
    async (req: Request, res: Response) => {
      try {
        await jkServiceInstance
          .getAnimesSeasonNow()
          .then((jk) => res.status(200).json(jk))
          .catch((error) => {
            throw error;
          });
      } catch (error) {
        return res.status(400).json(error);
      }
    }
  );

  route.get(
    '/anime/:year/:season',
    async (req: Request, res: Response) => {
      try {
        await jkServiceInstance
          .getAnimesSeason(req.params.year, req.params.season)
          .then((jk) => res.status(200).json(jk))
          .catch((error) => {
            throw error;
          });
      } catch (error) {
        return res.status(400).json(error);
      }
    }
  );

  route.get('/anime/:name', async (req: Request, res: Response) => {
    try {
      await jkServiceInstance
        .getAnimeByName(req.params.name)
        .then((jk) => res.status(200).json(jk))
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      return res.status(400).json(error);
    }
  });
};
