import "dotenv/config";
import express from "express";
import cors from "cors";
import userRouter from "./routes/user.routes";
import cookieParser from "cookie-parser";
import { connectToDB } from "./db/connectToDB";
import { errorHandlerMW } from "./middlewares/errorHandler.mw";
import { invalidUrlMW } from "./middlewares/invalidUrl.mw";

const app = express();
const PORT = Number(process.env.PORT) || 8000;
const CLIENT_URLS = (
  process.env.CLIENT_URLS ||
  process.env.CLIENT_URL ||
  "http://localhost:5173"
)
  .split(",")
  .map((url) => url.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser clients and same-origin requests without Origin header.
      if (!origin) {
        return callback(null, true);
      }

      if (CLIENT_URLS.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/user", userRouter);

app.use(invalidUrlMW);

app.use(errorHandlerMW);

connectToDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
});
