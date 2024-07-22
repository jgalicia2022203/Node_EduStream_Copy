import { Router } from "express";
import { check } from "express-validator";
import { validateFields } from "../common/middlewares/validate-fields.js";
import { validateJWT } from "../common/middlewares/validate-jwt.js";
import { listMessagesByStream, sendMessage } from "./message.controller.js";

const router = Router();

router.post(
  "/",
  validateJWT,
  [
    check("streamId", "streamId is mandatory").not().isEmpty(),
    check("userId", "userId is mandatory").not().isEmpty(),
    check("message", "message is mandatory").not().isEmpty(),
    validateFields,
  ],
  sendMessage
);

router.get("/:streamId", validateJWT, listMessagesByStream);

export default router;
