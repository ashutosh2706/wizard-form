import { QueryParams } from "../types/queryParams";

export function constructQuery(pageNumber: number, pageSize: number, searchTerm: string): string {

    const queryParams: QueryParams = {
        PageNumber: pageNumber,
        PageSize: pageSize,
        SearchTerm: searchTerm
    };

    const queryString: string = Object.entries(queryParams)
        .filter(([, value]) => value !== "")
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join("&");

    return queryString;
}