import { Request, Response, Router } from "express";
import Container from "typedi";
import UserService from "../../services/user.service";
import { formatUser } from "../../utils/format.util";
const route = Router();

export default (app: Router) => {
  app.use("/user", route);

  const userServiceInstance = Container.get(UserService);

  route.get("/all", async (req: Request, res: Response) => {
    try {
      await userServiceInstance
        .getAllUsers()
        .then((data) =>
          res.status(200).json({
            Result: data.Result,
            Users: data.Users.map((user) => formatUser(user)),
          })
        )
        .catch((error) => {
          throw error;
        });
    } catch (err) {
      res.status(400).json(err);
    }
  });

  route.get("/role/:id", async (req: Request, res: Response) => {
    try {
      await userServiceInstance
        .getRoleUser(req.params.id)
        .then((role) => res.status(200).json(role))
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      res.status(400).json(error);
    }
  });

  route.get("/:id", async (req: Request, res: Response) => {
    try {
      await userServiceInstance
        .getUserById(req.params.id)
        .then((role) => res.status(200).json(role))
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      res.status(400).json(error);
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
