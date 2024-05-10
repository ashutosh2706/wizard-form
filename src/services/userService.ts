import { AxiosInstance } from "axios";
import apiConfig from "../api/apiConfig";
import { constructQuery } from "../utils/apiUtil";

const api: AxiosInstance = apiConfig();

export const userService = {

    getUsers: async(searchTerm: string, pageNumber: number, pageSize: number) => {

        const queryString = constructQuery(pageNumber, pageSize, searchTerm, "", "");

        try {
            const response = await api.get(`Users?${queryString}`);
            return response.data;
        } catch (error) {
            throw new Error("An error occurred while fetching users");
        }
    },
    
    allowUser: async(userId: number) => {
        try {
            const response = await api.put('Users/allow/' + userId);
            return response.data;
        } catch (error) {
            throw new Error("An error occurred while performing the requested action");
        }
    },
    
    changeRole: async(userId: number, roleId: number) => {
        try {
            await api.put('Users/change-role', {userId, roleId});
        } catch (error) {
            throw new Error("An error occurred while performing the requested action");
        }
    }
}