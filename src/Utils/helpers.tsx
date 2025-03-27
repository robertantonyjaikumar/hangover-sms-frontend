import CryptoJS from "crypto-js";
import { SiteName, SiteSymb } from "./constants";


const SECRET_KEY = "TEST"; // Use an environment variable for security

export const encryptData = (data: any) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

export const decryptData = () => {
  const encryptedData: string | null = localStorage.getItem('udata')
  if (encryptedData) {
    const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } else {
    return "ERROR"
  }
};


export function isLoggedIn() {
  const token = localStorage.getItem('udata');
  if (token) return true;

  return false;
}

export function setSiteTitle(title: string) {
  return title + SiteSymb + SiteName
}
