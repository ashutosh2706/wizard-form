import { AxiosInstance } from "axios";
import apiConfig from "../api/apiConfig";
import { UserModel } from "../types/userModel";

const api: AxiosInstance = apiConfig();

export const userService = {

    getUsers: async(): Promise<UserModel[]> => {
        try {
            const response = await api.get('Users');
            return response.data;
        } catch (error) {
            throw new Error('Bad Request');
        }
    },
    
    allowUser: async(userId: unknown): Promise<void> => {
        try {
            const response = await api.put('Users/allow/' + userId);
            return response.data;
        } catch (error) {
            throw new Error('Bad Request');
        }
    }
}