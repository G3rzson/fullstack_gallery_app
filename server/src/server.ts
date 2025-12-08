import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createGaleryTitle } from "./routes/galery/createGaleryTitle";
import { connectToDB } from "./db/connectToDB";
import { getGaleryTitles } from "./routes/galery/getGaleryTitles";
import { getGaleryImages } from "./routes/galery/getGaleryImages";
import {
  uploadGaleryImages,
  createGaleryImage,
} from "./routes/galery/createGaleryImage";

dotenv.config();
const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

// Serve uploaded files
app.use("/uploads", express.static("uploads"));

app.post("/galery/create", createGaleryTitle);
app.post("/galery/:url", uploadGaleryImages, createGaleryImage);
app.get("/galery/get-galery-titles", getGaleryTitles);
app.get("/galery/:url/images", getGaleryImages);

connectToDB().then(() => {
  app.listen(PORT, () =>
    console.log(`Server fut a http://localhost:${PORT} - es porton`)
  );
});
