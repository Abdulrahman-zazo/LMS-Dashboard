import CryptoJS from "crypto-js";
import { cookieService } from "../CookiesServices";
// ------ مفتاح التشفير (يجب أن يكون سريًا ويُخزن بأمان) ------
const SECRET_KEY = import.meta.env.VITE_ENCRYPTION_KEY!;

// ------ تشفير التوكن ------
export const encryptToken = (token: string): string => {
  const encrypted = CryptoJS.AES.encrypt(token, SECRET_KEY).toString();
  cookieService.set("auth_token", encrypted);
  return encrypted;
};

// ------ فك تشفير التوكن ------
export const decryptToken = (encryptedToken: string): string => {
  const bytes = CryptoJS.AES.decrypt(encryptedToken, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};
// // عند القراءة:
// const encryptedToken = cookieService.get('auth_token');
// const decrypted = CryptoJS.AES.decrypt(encryptedToken, SECRET_KEY).toString(CryptoJS.enc.Utf8);
