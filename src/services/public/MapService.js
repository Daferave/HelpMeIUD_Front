import {axiosConfig} from '../../config/axiosConfig';

export const getAllCasos = () => {
    const URL = '/casos';
    return axiosConfig.get(URL);
}