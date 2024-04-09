export interface UserRequest {
    requestId: number,
    requestDate: string,
    requestTitle: string,
    requestStatus: string
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
}