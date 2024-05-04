export interface UserRequest {
    requestId: number,
    requestDate: string,
    title: string,
    status: string
}

export interface UserRequestAPI {
    guardianName: string,
    phone: string,
    priorityCode: number,
    requestDate: string,
    requestId: number,
    userId: number,
    statusCode: number,
    title: string
    attachedFile: null
}