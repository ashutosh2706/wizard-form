import { AxiosInstance } from "axios";
import apiConfig from "../api/apiConfig";
import { UserRequestAPI } from "../types/userRequest";
import { constructQuery } from "../utils/apiUtil";

const api: AxiosInstance = apiConfig();

export const requestService = {

    getUserRequests: async(userId: number, searchTerm: string, pageNumber: number, pageSize: number) => {

        const queryString = constructQuery(pageNumber, pageSize, searchTerm);

        try {
            const response = await api.get(`Requests/user/${userId}?${queryString}`);
            return response.data;
        } catch (error) {
            throw new Error("An error occurred while fetching requests");
        }
    },

    getAllRequests: async(searchTerm: string, pageNumber: number, pageSize: number) => {

        const queryString = constructQuery(pageNumber, pageSize, searchTerm);

        try {
            const response = await api.get(`Requests/?${queryString}`);
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