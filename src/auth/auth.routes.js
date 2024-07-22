import { Router } from "express";
import { check } from "express-validator";
import { validateFields } from "../common/middlewares/validate-fields.js";
import { login, register } from "./auth.controller.js";

const router = Router();

router.post(
  "/login",
  [
    check("username", "The username is required").not().isEmpty(),
    check("password", "The password is required").not().isEmpty(),
    validateFields,
  ],
  login
);

router.post(
  "/register",
  [
    check("username", "The username is required").not().isEmpty(),
    check("password", "The password is required").not().isEmpty(),
    check("email", "The email is required").not().isEmpty(),
    check("birthday", "The birthday is required").not().isEmpty(),
    check("phone", "The phone is required").not().isEmpty(),
    validateFields,
  ],
  register
);

export default router;
