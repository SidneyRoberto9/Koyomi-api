import { loginDto, userCreateDto } from "../../interfaces/user.interface";
import AuthService from "../../services/auth.service";
import { Request, Response, Router } from "express";
import Container from "typedi";
const route = Router();

export default (app: Router) => {
  app.use("/auth", route);

  const authServiceInstance = Container.get(AuthService);

  route.post("/register", async (req: Request, res: Response) => {
    try {
      await authServiceInstance
        .register(req.body as userCreateDto)
        .then((response) => res.status(201).json(response))
        .catch((error) => {
          throw error;
        });
    } catch (err) {
      res.status(400).json(err);
    }
  });

  //LOGIN
  route.post("/login", async (req: Request, res: any) => {
    try {
      await authServiceInstance
        .login(req.body as loginDto)
        .then((response) => res.status(200).json(response))
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      res.status(400).json(error);
    }
  });
};
