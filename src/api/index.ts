import animeRoute from "./routes/anime.route";
import jikanRoute from "./routes/jikan.route";
import authRoute from "./routes/auth.route";
import userRoute from "./routes/user.route";
import { Router } from "express";

export default () => {
  const app = Router();
  animeRoute(app);
  jikanRoute(app);
  authRoute(app);
  userRoute(app);

  return app;
};
