import { LoginResponse } from "../types/LoginResponse";

export async function login(email: string, password: string): Promise<LoginResponse> {

    const response = await fetch(import.meta.env.VITE_API_BASE_URL+"Users/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    });

    if(!response.ok) {
        throw new Error("Bad Request")
    }

    const responseData: LoginResponse = await response.json();
    
    return { role: responseData.role, token: responseData.token };
}