import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createGaleryTitle } from "./routes/galery/createGaleryTitle";
import { connectToDB } from "./db/connectToDB";
import { getGaleryTitles } from "./routes/galery/getGaleryTitles";

dotenv.config();
const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

app.post("/galery/create", createGaleryTitle);
app.get("/galery/get-galery-titles", getGaleryTitles);

connectToDB().then(() => {
  app.listen(PORT, () =>
    console.log(`Server fut a http://localhost:${PORT} - es porton`)
  );
});
