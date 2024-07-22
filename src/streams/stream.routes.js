import { Router } from "express";
import { check } from "express-validator";
import { validateFields } from "../common/middlewares/validate-fields.js";
import { validateJWT } from "../common/middlewares/validate-jwt.js";
import {
  endStream,
  getStreamById,
  listStreamsByCategory,
  startStream,
} from "./stream.controller.js";

const router = Router();

router.post(
  "/start",
  validateJWT,
  [
    check("title", "the title is mandatory").not().isEmpty(),
    check("description", "the description is mandatory").not().isEmpty(),
    check("channelId", "the channelId is mandatory").not().isEmpty(),
    check("categoryId", "the categoryId is mandatory").not().isEmpty(),
    validateFields,
  ],
  startStream
);

router.post("/end/:id", validateJWT, endStream);

router.get("/:id", getStreamById);

router.get("/categories/:categoryId", validateJWT, listStreamsByCategory);

export default router;
