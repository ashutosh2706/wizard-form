export async function login(email: string, password: string): Promise<string> {

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

    const responseData: string = await response.text();
    
    return responseData;
}