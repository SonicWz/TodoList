import axios from 'axios';

export const instance = axios.create({
    baseURL: 'http://localhost:3003/',
    withCredentials: true,
    headers: {},
});
