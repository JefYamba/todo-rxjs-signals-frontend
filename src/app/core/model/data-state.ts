import { State } from './state';
import { TodoResponse } from './todo-response';

export interface DataState {
    state: State;
    data?: {
        todos?: TodoResponse[];
        todo?: TodoResponse;
    };
    error?: string;
}
