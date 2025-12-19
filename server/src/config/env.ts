const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

if (!accessTokenSecret) {
  throw new Error("Missing ACCESS_TOKEN_SECRET");
}

if (!refreshTokenSecret) {
  throw new Error("Missing REFRESH_TOKEN_SECRET");
}

export const ACCESS_TOKEN_SECRET: string = accessTokenSecret;
export const REFRESH_TOKEN_SECRET: string = refreshTokenSecret;
