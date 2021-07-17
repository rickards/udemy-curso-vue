import axios from "axios";

export const HTTP = axios.create({
    baseURL: process.env.FINANCE_API_URL,
});