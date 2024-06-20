import { TodoResponse } from './todo-response';

export interface TodoState {
    isOnEditing: boolean;
    editingMode?: 'ADD' | 'UPDATE';
    todo?: TodoResponse;
}
