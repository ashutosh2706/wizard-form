import { AxiosInstance } from "axios";
import apiConfig from "../api/apiConfig";
import { UserRequestAPI } from "../types/userRequest";

const api: AxiosInstance = apiConfig();

export const requestService = {

    getUserRequests: async(userId: number, query:string, page: number, limit: number) => {
        try {
            const response = await api.get(`Requests/user/${userId}?page=${page}&limit=${limit}&query=${query}`);
            return response.data;
        } catch (error) {
            throw new Error("An error occurred while fetching requests");
        }
    },

    getUserRequestsAdmin: async(query: string, page: number, limit: number) => {
        try {
            const response = await api.get(`Requests/?page=${page}&limit=${limit}&query=${query}`);
            return response.data;
        } catch (error) {
            throw new Error("An error occurred while fetching requests");
        }
    },

    updateRequestStatus: async(requestId: number, statusCode: number) => {
        try {
            await api.put('Requests/update/' + requestId + '/' + statusCode);
        } catch (error) {
            throw new Error("An error occurred while updating request status");
        }
    },

    getRequestByRequestId: async(requestId: number): Promise<UserRequestAPI> => {
        try {
            const response = await api.get('Requests/' + requestId);
            return response.data;
        } catch (error) {
            throw new Error("An error occurred while fetching request details");
        }
    },
    
    submitRequest: async(requestData: FormData) => {
        try {
            await api.post('Requests', requestData);
        } catch (error) {
            throw new Error('500: Internal Server Error');
        }
    }
}