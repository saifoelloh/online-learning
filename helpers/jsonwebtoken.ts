import fs from "fs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { USER_ROLE } from "../types/user";
dotenv.config();

interface TokenData {
  userId: string;
  role: USER_ROLE;
}

class JsonWebToken {
  privateKey: jwt.Secret;
  constructor() {
    this.privateKey = fs.readFileSync("../signature");
  }

  generateToken = (data: TokenData, options: jwt.SignOptions) => {
    const token = jwt.sign(data, this.privateKey, options);
    return token;
  };

  verifyToken = (token: string) => {
    const data = jwt.verify(token, this.privateKey) as TokenData;
    return data;
  };
}

export default JsonWebToken;
