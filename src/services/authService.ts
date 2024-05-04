import { AxiosError, AxiosInstance } from "axios";
import apiConfig from "../api/apiConfig";


const api: AxiosInstance = apiConfig();

const authService = {

    login: async(loginData: FormData): Promise<string> => {
        try {
            const response = await api.post('Users/login', loginData);
            return response.data;
        } catch (error) {
            if(error instanceof AxiosError) {
                if(error.response?.status === 400) throw new Error("Wrong email/password");
                else if(error.response?.status === 401) throw new Error("Account has not been activated");
                else throw new Error("500: Internal Server Error");
            } else {
                throw new Error("An error occurred while logging in.");
            }
        }
    },

    register: async (userData: FormData) => {
        try {
            const response = await api.post('Users/register', userData);
            return response.data;
        } catch (error) {
            throw new Error("An error occurred while registering user.");
        }
    }
    
}

export default authService;