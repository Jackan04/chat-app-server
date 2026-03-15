import app from "./app.js";
import "dotenv/config";

const PORT = process.env.PORT;
app.listen(PORT, (error) => {
  if (error) {
    console.error(error);
  }

  console.log(`Server running on port ${PORT}`);
});
