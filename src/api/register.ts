export const register = async (firstName: string, lastName: string, email: string, password: string, roleId: number) => {
    
    const response = await fetch(import.meta.env.VITE_API_BASE_URL+"Users", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({firstName, lastName, email, password, roleId})
    });

    if(!response.ok) {
        throw new Error("Server Error")
    }

    const responseData = await response.json();
    return { responseData };
}