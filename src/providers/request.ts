import axios, { type AxiosRequestConfig } from "axios";
import { SERVER_URL } from "../constants";

const instance = axios.create({
    baseURL: SERVER_URL
});


async function get(url: string, options: AxiosRequestConfig = {}) {
    const response = await instance.get(url, options);
    return response?.data;
}


export default {
    get,
};