import express from "express";
import "dotenv/config";
import router from "./routes/routes.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", router);

const PORT = process.env.PORT;
app.listen(PORT, (error) => {
  if (error) {
    console.error(error);
  }

  console.log(`Server running on port ${PORT}`);
});
