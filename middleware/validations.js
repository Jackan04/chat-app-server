import { body } from "express-validator";
import { prisma } from "../lib/prisma.js";

const registerValidations = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .bail()
    .custom(async (username) => {
      const existingUser = await prisma.user.findUnique({
        where: {
          username: username,
        },
      });

      if (existingUser) throw new Error("Username is already taken");
    }),
  body("displayName").trim().notEmpty().withMessage("Display Name is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  body("passwordConfirmation")
    .custom((passwordConfirmation, { req }) => {
      return passwordConfirmation === req.body.password;
    })
    .withMessage("Passwords do not match"),
];

const loginValidations = [
  body("username").trim().notEmpty().withMessage("Username is required").bail(),

  body("password").trim().notEmpty().withMessage("Password is required"),
];

export { registerValidations, loginValidations };
