import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectToDB } from "./db/connectToDB";
import galeryRouter from "./routes/galery.routes";
import authRouter from "./routes/auth.routes";
import { errorHandlerMW } from "./middlewares/errorHandler.mw";
import { invalidUrlMW } from "./middlewares/invalidUrl.mw";

dotenv.config();
const app = express();
const PORT = Number(process.env.PORT) || 3000;

// json middleware
app.use(express.json());

// cookie parser middleware
app.use(cookieParser());

// allow only specific origins
const allowedOrigins = [process.env.FRONTEND_URL];

// CORS setup
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

// images static serving
app.use("/uploads", express.static("uploads"));

// galery routes
app.use("/api/galery", galeryRouter);

// auth routes
app.use("/api/auth", authRouter);

// handle 404 for all unknown routes. ALWAYS after the routes
app.use(invalidUrlMW);

// global error handler
app.use(errorHandlerMW);

// connect to DB and start server
connectToDB().then(() => {
  app.listen(PORT, () =>
    console.log(`Server running at http://localhost:${PORT}`)
  );
});
