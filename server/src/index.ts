import "dotenv/config";
import express from "express";
import userRouter from "./routes/user.routes";
import { connectToDB } from "./db/connectToDB";

const app = express();
const PORT = Number(process.env.PORT) || 8000;

app.use(express.json());

app.use("/api/user", userRouter);

connectToDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
});
