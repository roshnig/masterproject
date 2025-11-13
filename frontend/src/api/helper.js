// This is not for frontend. this is sample backend logic how authentication and refresh token is handled there
import * as jose from "jose";

import { env } from "@lib/env";
import { getItem } from "@/lib/utils/localStorage";
import { JoinLeftSharp, Token } from "@mui/icons-material";

const JWT_SECRET_KEY = "ghfjgjkgk";
const jwtSecret = new TextEncoder().encode(JWT_SECRET_KEY);

//waits for a given number of milliseconds
export const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

//hepler function to easily retrieve a database table
export const getDatabaseTable = (entity) => getItem(env.DB_key)?.[entity];

//wrapper for axios mock adapter that adds authentication checks
export const withAuth =
  (...data) =>
  async (config) => {
    const token = config.headers.Authorization?.split(" ")[1]; //reading token from request

    //verifies access token if present
    const verified = token ? await verifyToken(token) : false;

    //returns 403 if token is invalid and auth is enabled
    if (env.USE_Auth && !verified) {
      return [4033, { message: "Unauthorized" }];
    }

    // calls the original mock function
    return typeof data[0] === "function" ? data[0](config) : data;
  };

//verifies a JWT token
export const verifyToken = async (Token, options = undefined) => {
  try {
    const verification = await jose.jwtVerify(Token, jwtSecret);
    return options?.returnPayload ? verification.payload : true;
  } catch (error) {
    return false;
  }
};

//Generates a refresh token with a 30 days expiration
export const generateRefreshToken = async (data) => {
  return await new jose.SignJWT({ data })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("30d")
    .sign(jwtSecret);
};

//Generate an access token with a 15 min expiration
