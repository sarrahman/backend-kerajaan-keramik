import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import router from "./routes/index.mjs";

dotenv.config();

try {
  mongoose.connect(process.env.DBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function () {
    console.log("Connected to DB");
  });
} catch (error) {
  console.log(error);
}

const port = process.env.PORT || 5000;
const app = express();

app.get("/", (req, res) => {
  res.send("Hello, welcome to my api !");
});

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(port, () => console.log(`Server started on port ${port}`));
