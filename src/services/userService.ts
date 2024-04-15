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
            throw new Error("An error occurred while fetching users");
        }
    },
    
    allowUser: async(userId: unknown): Promise<void> => {
        try {
            const response = await api.put('Users/allow/' + userId);
            return response.data;
        } catch (error) {
            throw new Error("An error occurred while performing the requested action");
        }
    },
    
    changeRole: async(userId: number, roleId: number): Promise<void> => {
        try {
            await api.put('Users/roles', {userId, roleId});
        } catch (error) {
            throw new Error("An error occurred while performing the requested action");
        }
    }
}