import { verify } from "jsonwebtoken";
import CryptoJS from "crypto-js";
import config from "../../config";

export default function validate(req: any, res: any, next: () => void) {
  const authHeader = req.headers.token;

  if (!authHeader) return res.status(401).json("You are not authenticated!");

  const token = authHeader.split(" ")[1];

  verify(token, config.criptoKey, (err: any, user: any) => {
    if (err) return res.status(403).json("Token is not valid");

    req.user = user;
    next();
  });
}

export const decryptPassword = (password: string): string => {
  return CryptoJS.AES.decrypt(password, config.criptoKey).toString(
    CryptoJS.enc.Utf8
  );
};

export const encryptPassword = (password: string): string => {
  return CryptoJS.AES.encrypt(password, config.criptoKey).toString();
};
