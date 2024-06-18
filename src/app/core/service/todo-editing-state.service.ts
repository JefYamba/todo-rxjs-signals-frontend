import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TodoState } from '../model/todo-state';
import { TodoEditingState } from '../model/todo-editing-state';
import { DataState } from '../model/data-state';
import { State } from '../model/state';
import { TodoApi } from '../api/todo.api';

@Injectable({
    providedIn: 'root',
})
export class TodoEditingStateService {
    todoApi = inject(TodoApi);

    private editingState$ = new BehaviorSubject<TodoState>({
        state: TodoEditingState.EDITING_OFF,
    });
    private todosSubject = new BehaviorSubject<DataState>({
        state: State.LOADING,
    });
    todos$ = this.todosSubject.asObservable();

    setEditingState(initialState: TodoState) {
        this.editingState$.next(initialState);
    }

    getEditingState() {
        return this.editingState$;
    }

    setTodos() {}

    getAllTodos() {
        return this.todos$;
    }
}
