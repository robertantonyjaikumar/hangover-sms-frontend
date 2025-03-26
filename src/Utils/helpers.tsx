// import CryptoJS from "crypto-js";
import { SiteName, SiteSymb } from "./constants";

//To encypt single data
export function encryptSingleData(encData: any) {
  if (encData) {
    var retData = btoa((encData + 122354125410));
    return retData;
    /*var b64 = CryptoJS.AES.encrypt((encData).toString(), 'encSingleData-internalKey').toString();
    var e64 = CryptoJS.enc.Base64.parse(b64);
    var eHex = e64.toString(CryptoJS.enc.Hex);
    return eHex;*/
  }
}

//To Decrypt single data
export function decryptSingleData(encData: any) {
  if (encData) {
    var smp: any = atob(encData);
    if ((smp)) {
      var retData = smp - 122354125410;
      return retData
    }
    /*var reb64 = CryptoJS.enc.Hex.parse(encData);
    var bytes = reb64.toString(CryptoJS.enc.Base64);
    var decrypt = CryptoJS.AES.decrypt(bytes, 'encSingleData-internalKey');
    var plain = decrypt.toString(CryptoJS.enc.Utf8);
    return plain;*/
  }
}

export function isLoggedIn() {
  const token = localStorage.getItem('utkn');
  if (token) return true;

  return false;
}

export function decryptUserDataLocalStorage() {
  //const token = localStorage.getItem('user_token');
  // const bytes = (localStorage.getItem('udata')) ? CryptoJS.AES.decrypt(localStorage.getItem('udata'), 'ecom-htl-udata') : '';
  // console.log(localStorage.getItem('udata'));
  if (localStorage.getItem('udata')) {
    const lct: any = localStorage.getItem('udata');
    const decrypted = ''//CryptoJS.AES.decrypt(lct, 'ecom-htl-udata').toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted);
  } else {
    return false;
  }
}


export function decryptUserTknLocalStorage() {
  if (localStorage.getItem('utkn')) {
    try {
      const lct: any = localStorage.getItem('utkn');
      const decrypted = ''//CryptoJS.AES.decrypt(lct, 'ecom-htl-udata-tkn').toString(CryptoJS.enc.Utf8);
      if (decrypted?.length > 0) {
        return decrypted.replace(/"/g, "");
      }
    } catch (err) {
      return err
    }
  } else {
    return false;
  }
}


// Function to encrypt the ID
export function encryptId(id: any) {
  const secretKey = 'id-encyrption-LAPP';
  const encrypted = ''//CryptoJS.AES.encrypt(id.toString(), secretKey).toString();
  const alphanumericEncrypted = encrypted.replace(/[^a-zA-Z0-9]/g, '');
  return alphanumericEncrypted;
}

// Function to decrypt the ID
export function decryptId(encryptedId: any) {
  const secretKey = 'id-encyrption-LAPP';
  const paddedEncryptedId = encryptedId.padEnd(encryptedId.length + (4 - encryptedId.length % 4) % 4, '=');
  const bytes = ''//CryptoJS.AES.decrypt(paddedEncryptedId, secretKey);
  // return bytes.toString(CryptoJS.enc.Utf8);
}


export function setHeadersAPI() {
  var tk: any = decryptUserTknLocalStorage();
  if (tk?.length > 0) {
    return {
      headers: {
        'Accept': 'application/json',
        "Content-type": "application/json",
        // "Access-Control-Allow-Origin": "*",
        'Authorization': `Bearer ${tk.replace(/"/g, "")}`,
      }
    }
  }
}

export function setSiteTitle(title: string) {
  return title + SiteSymb + SiteName
}

// export const axiosInstance = axios.create({
//   // baseURL: HRMS_UTILITY_API_URL,
//   headers: setHeadersAPI()?.headers
// })
// axiosInstance.interceptors.response.use((response) => Promise.resolve(response),
//   async (error) => {
//     const history = useNavigate();
//     if (!error.response) {
//       return Promise.reject(error);
//     }
//     if (error.response.status === 401) {
//       var result = window.confirm(
//         "Session Expired, You will be redirected to Login !"
//       );
//       if (result) {
//         // alert("generate Token");
//         history('/login');
//       } else {
//         return Promise.reject(error);
//       }
//     } else {
//       return Promise.reject(error);
//     }
//   }
// );