import { axiosConfig } from "../config/axiosConfig";

const credenciales = btoa(process.env.REACT_APP_NAME + ':' + process.env.REACT_APP_AUTH_PASSWORD);
const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + credenciales,
};

export const login = async (user) => {
        const params = new URLSearchParams();
        params.set('grant_type', 'password');
        params.set('username', user.username);
        params.set('password', user.password);
        return await axiosConfig.post(
                process.env.REACT_APP_AUTH_URL,
                params, {
                    headers: headers
                }
            );
}

export const logout = () => {
    console.log('logout auth service')
    sessionStorage.clear();
}