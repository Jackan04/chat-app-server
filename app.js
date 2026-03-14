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

const PORT = process.env.PORT;
app.listen(PORT, (error) => {
  if (error) {
    console.error(error);
  }

  console.log(`Server running on port ${PORT}`);
});
