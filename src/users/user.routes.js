import { Router } from "express";
import { check } from "express-validator";
import { validateFields } from "../common/middlewares/validate-fields.js";
import { validateJWT } from "../common/middlewares/validate-jwt.js";
import {
  getUserById,
  updateUser,
  getFollowedChannels,
} from "./user.controller.js";

const router = Router();

router.get("/:id", validateJWT, getUserById);
router.put(
  "/:id",
  validateJWT,
  [
    check("username", "The username is required").optional().not().isEmpty(),
    check("password", "The password is required").optional().not().isEmpty(),
    check("email", "The email is required").optional().not().isEmpty(),
    check("birthday", "The birthday is required").optional().not().isEmpty(),
    check("phone", "The phone is required").optional().not().isEmpty(),
    validateFields,
  ],
  updateUser
);

router.get("/followed-channels/:userId", validateJWT, getFollowedChannels);

export default router;
