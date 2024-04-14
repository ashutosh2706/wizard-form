import { AxiosInstance } from "axios";
import apiConfig from "../api/apiConfig";
import { UserRequestAPI } from "../types/userRequest";

const api: AxiosInstance = apiConfig();

export const requestService = {

    getUserRequests: async(userId: number): Promise<UserRequestAPI[]> => {
        try {
            const response = await api.get('Requests/user/' + userId);
            return response.data;
        } catch (error) {
            throw new Error('Bad Request');
        }
    },

    getUserRequestsAdmin: async(): Promise<UserRequestAPI[]> => {
        try {
            const response = await api.get('Requests');
            return response.data;
        } catch (error) {
            throw new Error('Bad Request');
        }
    },

    updateRequestStatus: async(requestId: number, statusCode: number) => {
        try {
            await api.put('Requests/update/' + requestId + '/' + statusCode);
        } catch (error) {
            throw new Error('Bad Request');
        }
    },

    getRequestByRequestId: async(requestId: number): Promise<UserRequestAPI> => {
        try {
            const response = await api.get('Requests/' + requestId);
            return response.data;
        } catch (error) {
            throw new Error('Bad Request');
        }
    },
    
    submitRequest: async(requestData: FormData) => {
        try {
            await api.post('Requests', requestData);
        } catch (error) {
            throw new Error('Bad Request');
        }
    }
}