import { AxiosInstance } from "axios";
import apiConfig from "../api/apiConfig";


const api: AxiosInstance = apiConfig();

const authService = {

    login: async(email: string, password: string): Promise<string> => {
        try {
            const response = await api.post('Users/login', {email, password});
            return response.data;
        } catch (error) {
            throw new Error("Login Failed");
        }
    },

    register: async (firstName: string, lastName: string, email: string, password: string, roleId: number) => {
        try {
            const response = await api.post('Users', {firstName, lastName, email, password, roleId});
            return response.data;
        } catch (error) {
            throw new Error("Register Failed");
        }
    }
    
}

export default authService;