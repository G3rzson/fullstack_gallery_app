import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectToDB } from "./db/connectToDB";
import galeryRouter from "./routes/galery.routes";
import authRouter from "./routes/auth.routes";
import { errorHandlerMW } from "./middlewares/errorHandler.mw";
import { invalidUrlMW } from "./middlewares/invalidUrl.mw";
import { UPLOADS_DIR } from "./config/paths";

dotenv.config();
const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

app.use(cookieParser());

const allowedOrigins = [process.env.FRONTEND_URL];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS hiba"));
      }
    },
    credentials: true,
  })
);

app.use("/uploads", express.static(UPLOADS_DIR));

app.use("/api/galery", galeryRouter);
app.use("/api/auth", authRouter);

app.use(invalidUrlMW);

app.use(errorHandlerMW);

connectToDB().then(() => {
  app.listen(PORT, () =>
    console.log(`Server running at http://localhost:${PORT}`)
  );
});
