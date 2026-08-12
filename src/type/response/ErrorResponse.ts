export interface ErrorResponse<T> {
    message: string;
    details: T,
    msid: string;
}