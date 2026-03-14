import app from "./app.js";

const PORT = process.env.PORT;
app.listen(PORT, (error) => {
  if (error) {
    console.error(error);
  }

  console.log(`Server running on port ${PORT}`);
});
