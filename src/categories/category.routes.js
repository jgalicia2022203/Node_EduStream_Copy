import { Router } from "express";
import { check } from "express-validator";
import { validateJWT } from "../common/middlewares/validate-jwt.js";
import {
  addCategory,
  deleteCategory,
  getCategoryById,
  listCategories,
  updateCategory,
} from "./category.controller.js";

const router = Router();

router.get("/", validateJWT, listCategories);

router.get("/:id", validateJWT, getCategoryById);

router.post(
  "/",
  validateJWT,
  [
    check("name", "the name is mandatory").not().isEmpty(),
    check("description", "the description is mandatory").not().isEmpty(),
  ],
  addCategory
);

router.put(
  "/:id",
  validateJWT,
  [
    check("name", "the name is mandatory").optional().not().isEmpty(),
    check("description", "the description is mandatory")
      .optional()
      .not()
      .isEmpty(),
  ],
  updateCategory
);

router.delete("/:id", validateJWT, deleteCategory);

export default router;
