import axios from "axios";

export const axiosReq = axios.create({
    baseURL: "http://localhost:11434/api",
});
