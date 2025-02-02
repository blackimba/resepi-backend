import { ApiResponse } from "../model/apiResponse"

export const successResponse = <T>(data: T, message?: string): ApiResponse<T> => {
    return {
        success: true,
        data,
        message
    }
}

export const errorResponse = <T>(error: string, message?: string): ApiResponse<T> => {
    return {
        success: false,
        error,
        message,
    }
}