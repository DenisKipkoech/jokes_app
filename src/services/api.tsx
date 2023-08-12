import axios from "axios";

const baseAPI = axios.create({
    baseURL:`https://retoolapi.dev/zu9TVE/jokes`
});

export const baseGet = (url:string) => {
    const response = baseAPI.get(url);
    return response;
}

export const basePost = (url:string, data:Object) => {
    const response = baseAPI.post(url, data);
    return response;
}

export const basePatch = (url:string, data:Object) => {
    const response = baseAPI.patch(url, data);
    return response;
}

export const baseDelete = (url:string) => {
    const response = baseAPI.delete(url);
    return response;
}