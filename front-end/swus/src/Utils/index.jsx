import axios from "axios";

const token = sessionStorage.getItem("token");

const axiosInstance = axios.create({
  // baseURL: "https://i8a302.p.ssafy.io:8081/api",
  baseURL: "https://i8a302.p.ssafy.io/api",
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default axiosInstance;
