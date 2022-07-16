 export interface ResponseModel<T> {
    code: number;
    message: string;
    data: T[];
}

export interface PageableResponseModel<T> {
    code: number;
    message: string;
    data: {
        content: T[];
        totalElements: number;
        totalPages: number;
        size: number;
        number: number;

    }
}

export interface SingleDataResponseModel<T> {
    code: number;
    message: string;
    data: T;
}
