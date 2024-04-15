import { AxiosError, AxiosInstance } from "axios";
import apiConfig from "../api/apiConfig";


const api: AxiosInstance = apiConfig();

const authService = {

    login: async(email: string, password: string): Promise<string> => {
        try {
            const response = await api.post('Users/login', {email, password});
            return response.data;
        } catch (error) {
            if(error instanceof AxiosError) {
                if(error.response?.status === 400) throw new Error(`${error.response.status}: Account has not been activated`);
                else throw new Error(`${error.response?.status}: ${error.response?.data}`);
            } else {
                throw new Error("An error occurred while logging in.");
            }
        }
    },

    register: async (firstName: string, lastName: string, email: string, password: string, roleId: number) => {
        try {
            const response = await api.post('Users', {firstName, lastName, email, password, roleId});
            return response.data;
        } catch (error) {
            throw new Error("An error occurred while registering user.");
        }
    }
    
}

export default authService;