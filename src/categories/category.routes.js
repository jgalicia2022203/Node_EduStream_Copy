import { Router } from "express";
import { check } from "express-validator";
import { validateFields } from "../common/middlewares/validate-fields.js";
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
    validateFields,
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
    validateFields,
  ],
  updateCategory
);

router.delete("/:id", validateJWT, deleteCategory);

export default router;
