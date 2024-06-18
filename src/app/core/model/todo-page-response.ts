import { TodoResponse } from './todo-response';

export interface TodoPageResponse {
    content?: TodoResponse[];
    empty?: boolean;
    first?: boolean;
    last?: boolean;
    number?: number;
    numberOfElements?: number;
    size?: number;
    totalElements?: number;
    totalPages?: number;
}
