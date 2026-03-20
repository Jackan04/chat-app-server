import { body } from "express-validator";
import { prisma } from "../lib/prisma.js";
import sanitizeHtml from "sanitize-html";

const registerValidations = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .customSanitizer((v) => sanitizeHtml(v))
    .bail()
    .custom(async (username) => {
      const existingUser = await prisma.user.findUnique({
        where: {
          username: username,
        },
      });
      if (existingUser) throw new Error("Username is already taken");
    }),
  body("displayName")
    .trim()
    .notEmpty()
    .withMessage("Display name is required")
    .customSanitizer((v) => sanitizeHtml(v)),
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
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .customSanitizer((v) => sanitizeHtml(v))
    .bail(),
  body("password").trim().notEmpty().withMessage("Password is required"),
];

const updateValidations = [
  body("displayName")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Display name cannot be empty")
    .customSanitizer((v) => sanitizeHtml(v)),
  body("bio")
    .optional()
    .trim()
    .customSanitizer((v) => sanitizeHtml(v)),
];

const messageValidations = [
  body("content")
    .trim()
    .notEmpty()
    .withMessage("Message content is required")
    .customSanitizer((v) => sanitizeHtml(v)),
];

export {
  registerValidations,
  loginValidations,
  updateValidations,
  messageValidations,
};
