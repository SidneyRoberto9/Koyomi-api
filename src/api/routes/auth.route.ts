import { Request, Response, Router } from "express";
import Container from "typedi";

import { loginDto, userCreateDto } from "../../interfaces/user.interface";
import AuthService from "../../services/auth.service";

const route = Router();

export default (app: Router) => {
  app.use("/auth", route);

  const authServiceInstance = Container.get(AuthService);

  route.post("/register", (req: Request, res: Response) => {
    authServiceInstance
      .register(req.body as userCreateDto)
      .then((response) => res.status(201).json(response))
      .catch((error) => {
        res.status(400).json(error);
      });
  });

  //LOGIN
  route.post("/login", (req: Request, res: any) => {
    authServiceInstance
      .login(req.body as loginDto)
      .then((response) => res.status(200).json(response))
      .catch((error) => {
        res.status(400).json(error);
      });
  });
};
