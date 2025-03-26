import axios from 'axios'
// import swal from 'sweetalert';
// import store from '../Store/store';
import { decryptUserTknLocalStorage } from './helpers';
export const axiosInstance = axios.create()

axiosInstance.interceptors.request.use(function (config) {
  // const token = (store?.getState()?.user?.userData?.Token?.length > 0) ? store?.getState()?.user?.userData?.Token : decryptUserTknLocalStorage();
  const token = decryptUserTknLocalStorage();
  // config.headers.Authorization = token ? `${token}` : '';
  config.headers.accessToken = token ? `${token}` : '';
  return config;
});

axiosInstance.interceptors.response.use((response) => Promise.resolve(response),
  async (error) => {
    if (!error.response) {
      return Promise.reject(error);
    }
    if (error.response.status === 401) {
      // var result = window.confirm(
      //   "Session Expired, Kindly Login !"
      // );
      // swal({
      //   title: "Login Required !",
      //   text: "Session Expired, Kindly Login !",
      //   icon: "warning",
      //   buttons: true,
      //   dangerMode: true,
      // })
      // .then((willDelete) => {
      //   if (willDelete) {
      //     window.location.href = "/login"
      //   } else {
      //     swal("Kindly Login to access full site !", {
      //       icon: "error"
      //     });
      //   }
      // });
      alert("Session Expired, Kindly Login !");
      window.location.href = "/"
      localStorage.removeItem('udata');
      localStorage.removeItem('utkn');
      // if (result) {
      //   console.log("generate Token");
      // } else {
      //   return Promise.reject(error);
      // }
    } else {
      return Promise.reject(error);
    }
  }
);