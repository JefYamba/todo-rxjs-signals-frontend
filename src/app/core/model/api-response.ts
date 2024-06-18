import { TodoPageResponse } from './todo-page-response';
import { TodoResponse } from './todo-response';

export interface ApiResponse {
    timestamp: string;
    statusCode: number;
    status: string;
    message: string;
    error: string;
    data: {
        todos?: TodoPageResponse;
        todo?: TodoResponse;
    };
}
