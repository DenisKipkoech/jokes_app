import axios from "axios";

const baseAPI = axios.create({
    baseURL:` https://retoolapi.dev/zu9TVE/jokes/`
});

export const baseGet = (url:string) => {
    const response = baseAPI.get(url);
    return response;
}