import { axiosConfig } from "../config/axiosConfig";

const headers = {
    'Content-Type': 'application/json',
};

export const register = async (user) => {
    const url = "/usuarios/signup";
    console.log(user);
    return await axiosConfig.post(url, user, {
        headers
    });
}