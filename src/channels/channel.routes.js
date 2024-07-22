import { Router } from "express";
import { check } from "express-validator";
import { validateFields } from "../common/middlewares/validate-fields.js";
import { validateJWT } from "../common/middlewares/validate-jwt.js";
import {
  addCategoryToChannel,
  followChannel,
  getChannelById,
  unfollowChannel,
  updateChannel,
} from "./channel.controller.js";

const router = Router();

router.get("/:id", validateJWT, getChannelById);
router.put(
  "/:id",
  validateJWT,
  [
    check("name", "the name is mandatory").optional().not().isEmpty(),
    check("description", "the description is mandatory")
      .optional()
      .not()
      .isEmpty(),
    validateFields,
  ],
  updateChannel
);
router.post(
  "/follow",
  validateJWT,
  [
    check("channelId", "the channelId is mandatory").not().isEmpty(),
    check("userId", "the userId is mandatory").not().isEmpty(),
  ],
  followChannel
);
router.post(
  "/unfollow",
  validateJWT,
  [
    check("channelId", "the channelId is mandatory").not().isEmpty(),
    check("userId", "the userId is mandatory").not().isEmpty(),
  ],
  unfollowChannel
);
router.post(
  "/add-category",
  validateJWT,
  [
    check("channelId", "the channelId is mandatory").not().isEmpty(),
    check("categoryId", "the userId is mandatory").not().isEmpty(),
  ],
  addCategoryToChannel
);

export default router;
