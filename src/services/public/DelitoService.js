import { axiosConfig } from "../../config/axiosConfig";

export const obtenerTodos = () => {
        return axiosConfig.get("/delitos");
}
