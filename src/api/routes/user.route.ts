import { Request, Response, Router } from "express";
import Container from "typedi";
import UserService from "../../services/user.service";
const route = Router();

export default (app: Router) => {
  app.use("/user", route);

  const userServiceInstance = Container.get(UserService);

  route.get("/all", async (req: Request, res: Response) => {
    try {
      await userServiceInstance
        .getAllUsers()
        .then((users) => res.status(200).json(users))
        .catch((error) => {
          throw error;
        });
    } catch (err) {
      res.status(400).json(err);
    }
  });

  route.delete("/:id", async (req: Request, res: Response) => {
    try {
      await userServiceInstance
        .deleteUser(req.params.id)
        .then((users) => res.status(200).json(users))
        .catch((error) => {
          throw error;
        });
    } catch (err) {
      res.status(400).json(err);
    }
  });
};
