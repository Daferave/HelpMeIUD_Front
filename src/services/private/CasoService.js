import { axiosConfig } from "../../config/axiosConfig";


export const crear = async (caso = {}) => {
    axiosConfig.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`;
    return await axiosConfig.post(
        process.env.REACT_APP_BASE_URL+"/casos", caso
    );
}