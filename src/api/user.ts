import { UserModel } from "../types/userModel";
import { getCookie } from "../utils/cookieUtil";

export async function getUsers(): Promise<UserModel[]> {

    const token = getCookie('token') ?? '';

    const response = await fetch(import.meta.env.VITE_API_BASE_URL + 'Users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    });

    if(!response.ok) {
        throw new Error("Bad Request");
    }

    const responseData: UserModel[] = await response.json();
    return responseData;
}


export async function allowUser(userId: unknown): Promise<void> {

    const token = getCookie('token') ?? '';

    const response = await fetch(import.meta.env.VITE_API_BASE_URL + 'Users/allow/' + userId, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    });

    if(!response.ok) throw new Error("Bad Request");
}