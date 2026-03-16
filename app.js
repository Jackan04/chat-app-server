import express from "express";
import "dotenv/config";
import cors from "cors";
import router from "./routes/routes.js";
import passport from "./config/passport.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(passport.initialize());

app.use("/api", router);

app.use((req, res) => {
  res.status(404).json({ message: "404 - Page Not Found" });
});

app.use((err, req, res, next) => {
  const responseBody = {
    message: err.message || "There was an error",
    validationErrors: err.validationErrors || [],
  };

  res.status(err.status || 500).json(responseBody);
});

export default app;
