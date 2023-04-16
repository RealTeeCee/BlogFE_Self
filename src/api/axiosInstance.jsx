import axios from "axios";
import React from "react";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/",
  withCredentials: true,
  // auth: {
  //   username: "user",
  //   password: "password",
  // },
});

export default axiosInstance;
