import mongoose from "mongoose";
import config from "../config";
import express from "express";
import { Server } from "http";
import routes from "../api";
import "reflect-metadata";
import cors from "cors";

export default class SetupApplication {
  private server?: Server;

  constructor(private port = config.port, public app = express()) {}

  public async init() {
    this.setupExpress();
    this.setupRoutes();
    await this.setupMongoose();
  }

  private setupRoutes(): void {
    this.app.use("/api", routes());
  }

  private setupExpress(): void {
    this.app.enable("trust proxy");
    this.app.use(cors());
    this.app.use(express.json());
  }

  private async setupMongoose(): Promise<void> {
    await mongoose
      .connect(config.mongoUrl)
      .then(() => console.log("DB Connected!"))
      .catch((err) => console.log(err));
  }

  public start(): void {
    this.server = this.app.listen(this.port, () => {
      console.log(`🛡️  Server listening on port: ${this.port} 🛡️`);
    });
  }
}
