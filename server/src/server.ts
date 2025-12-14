import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectToDB } from "./db/connectToDB";

import { createGaleryTitle } from "./routes/galery/createGaleryTitle";
import { getGaleryImages } from "./routes/galery/getGaleryImages";
import {
  uploadGaleryImages,
  createGaleryImage,
} from "./routes/galery/createGaleryImage";
import { deleteGaleryTitle } from "./routes/galery/deleteGaleryTitle";
import { deleteGaleryImage } from "./routes/galery/deleteGaleryImage";
import { getGaleryTitles } from "./routes/galery/getGaleryTitles";
import { editGaleryTitle } from "./routes/galery/editGaleryTitle";
import { registerUser } from "./routes/auth/registerUser";
import { loginUser } from "./routes/auth/loginUser";
import { logoutUser } from "./routes/auth/logoutUser";
import { refreshToken } from "./routes/auth/refreshToken";

dotenv.config();
const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // vagy ahol a frontend fut
    credentials: true, // ha küldesz cookie-t / auth header-t
  })
);

// Serve uploaded files
app.use("/uploads", express.static("uploads"));

app.post("/galery/galery-title/create", createGaleryTitle);
app.get("/galery/galery-titles/get", getGaleryTitles);
app.post("/galery/:url", uploadGaleryImages, createGaleryImage);
app.get("/galery/:url/images", getGaleryImages);
app.delete("/galery/delete/:id", deleteGaleryTitle);
app.delete("/galery/image/delete/:id", deleteGaleryImage);
app.put("/galery/update/:id", editGaleryTitle);
app.post("/auth/register", registerUser);
app.post("/auth/login", loginUser);
app.post("/auth/logout", logoutUser);
app.post("/auth/refresh", refreshToken);

connectToDB().then(() => {
  app.listen(PORT, () =>
    console.log(`Server fut a http://localhost:${PORT} - es porton`)
  );
});
