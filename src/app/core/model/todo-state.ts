import { TodoEditingState } from './todo-editing-state';
import { TodoResponse } from './todo-response';

export interface TodoState {
    state: TodoEditingState;
    todo?: TodoResponse;
}
