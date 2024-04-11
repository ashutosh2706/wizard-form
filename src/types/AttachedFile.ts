export interface AttachedFile {
    contentType: string;
    contentDisposition: string;
    data: string; // Base64 encoded file data
    length: number;
    name: string;
    fileName: string;
}