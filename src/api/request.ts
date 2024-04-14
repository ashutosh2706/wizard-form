import { UserRequestAPI } from "../types/userRequest";
import { getCookie } from "../utils/cookieUtil";

export async function getUserRequests(userId: number): Promise<UserRequestAPI[]> {

    const response = await fetch(import.meta.env.VITE_API_BASE_URL + 'Requests/user/' + userId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'api-key': import.meta.env.VITE_API_KEY
        }
    });

    if(!response.ok) {
        throw new Error("Bad Request")
    }

    const responseData: UserRequestAPI[] = await response.json();
    
    return responseData;
}

export async function getUserRequestsAdmin(): Promise<UserRequestAPI[]> {

    const token = getCookie('token') ?? '';
    
    const response = await fetch(import.meta.env.VITE_API_BASE_URL + 'Requests', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`,
            'api-key': import.meta.env.VITE_API_KEY
        }
    });

    if(!response.ok) {
        throw new Error("Bad Request")
    }

    const responseData: UserRequestAPI[] = await response.json();
    
    return responseData;
}

export async function updateRequestStatus(requestId: number, statusCode: number) {

    const token = getCookie('token') ?? '';

    const response = await fetch(import.meta.env.VITE_API_BASE_URL + 'Requests/update/' + requestId + '/' + statusCode, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`,
            'api-key': import.meta.env.VITE_API_KEY
        }
    });

    if(!response.ok) throw new Error("Bad Request");
}

export async function getRequestByRequestId(requestId: number): Promise<UserRequestAPI> {

    const response = await fetch(import.meta.env.VITE_API_BASE_URL + 'Requests/' + requestId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'api-key': import.meta.env.VITE_API_KEY
        }
    });

    if(!response.ok) throw new Error("Bad Request");

    const responseData: UserRequestAPI = await response.json(); 
    return responseData;
}

export async function submitRequest(requestData: FormData) {

    const response = await fetch(import.meta.env.VITE_API_BASE_URL + 'Requests', {
        method: 'POST',
        headers: {
            'api-key': import.meta.env.VITE_API_KEY
        },
        body: requestData
    });

    if(!response.ok) throw new Error("Bad Request");
    
}