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
  res.json({ err });
});

const PORT = process.env.PORT;
app.listen(PORT, (error) => {
  if (error) {
    console.error(error);
  }

  console.log(`Server running on port ${PORT}`);
});
