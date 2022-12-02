import axios from "axios";

const mainAxios = axios.create({
  baseURL: "http://192.168.1.188:3000/",
});

export { mainAxios };
