import axios from "axios";

const token = sessionStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: `http://i8a302.p.ssafy.io:8081/`,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default axiosInstance;
