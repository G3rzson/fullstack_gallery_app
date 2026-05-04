import { type JwtPayload } from "jsonwebtoken";

export type AuthTokenPayload = JwtPayload & {
  _id: string;
  username: string;
  role: "ADMIN" | "USER";
};

export type JwtSecrets = {
  accessTokenSecret: string;
  refreshTokenSecret: string;
};
