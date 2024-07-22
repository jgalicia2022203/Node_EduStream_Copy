"use strict";

import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "../src/auth/auth.routes.js";
import categoryRoutes from "../src/categories/category.routes.js";
import channelRoutes from "../src/channels/channel.routes.js";
import apiLimiter from "../src/common/middlewares/request-limiter.js";
import messageRoutes from "../src/messages/message.routes.js";
import streamRoutes from "../src/streams/stream.routes.js";
import userRoutes from "../src/users/user.routes.js";
import { dbConnection } from "./mongo.js";

class Server {
  constructor() {
    this.app = express();
    this.configHelmet();
    this.port = process.env.PORT;
    this.middlewares();
    this.connectDB();
    this.routes();
  }

  configHelmet() {
    this.app.use(
      helmet({
        contentSecurityPolicy: {
          directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "https://trusted.cdn.com"],
            styleSrc: ["'self'", "https://trusted.cdn.com"],
            imgSrc: ["'self'", "data:", "https://trusted.images.com"],
            connectSrc: ["'self'", "https://api.misitio.com"],
          },
        },
        frameguard: { action: "deny" },
        dnsPrefetchControl: { allow: false },
        expectCt: { enforce: true, maxAge: 86400 },
        referrerPolicy: { policy: "no-referrer" },
      })
    );
  }

  async connectDB() {
    await dbConnection();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(helmet());
    this.app.use(morgan("dev"));
    this.app.use(apiLimiter);
  }

  routes() {
    this.app.use("/EduStream/v1/auth", authRoutes);
    this.app.use("/EduStream/v1/users", userRoutes);
    this.app.use("/EduStream/v1/channels", channelRoutes);
    this.app.use("/EduStream/v1/streams", streamRoutes);
    this.app.use("/EduStream/v1/categories", categoryRoutes);
    this.app.use("/EduStream/v1/messages", messageRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server running on port ", this.port);
    });
  }
}

export default Server;
