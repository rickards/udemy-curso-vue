import axios from "axios";

export const HTTP = axios.create({
    baseURL: process.env.VUE_APP_FINANCE_API_URL,
});