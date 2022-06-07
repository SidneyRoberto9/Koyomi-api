import CryptoJS from "crypto-js";

import config from "../config";

export const decryptPassword = (password: string): string => {
  return CryptoJS.AES.decrypt(password, config.criptoKey).toString(
    CryptoJS.enc.Utf8
  );
};

export const encryptPassword = (password: string): string => {
  return CryptoJS.AES.encrypt(password, config.criptoKey).toString();
};
