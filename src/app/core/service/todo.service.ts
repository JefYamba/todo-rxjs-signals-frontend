import { inject, Injectable, OnDestroy, signal } from '@angular/core';
import { TodoApi } from '../api/todo.api';
import { TodoPageResponse } from '../model/todo-page-response';
import { TodoState } from '../model/todo-state';
import { Subscription } from 'rxjs';
import { TodoRequest } from '../model/todo-request';
import { Status } from '../model/status';

@Injectable({
    providedIn: 'root',
})
export class TodoService implements OnDestroy {
    todoApi = inject(TodoApi);

    todosSubscription = new Subscription();
    startTodoSubscription = new Subscription();
    completeTodoSubscription = new Subscription();
    getTodoSubscription = new Subscription();
    addTodoSubscription = new Subscription();
    updateTodoSubscription = new Subscription();
    deleteTodoSubscription = new Subscription();

    Filters: Status[] = [
        Status.ALL,
        Status.NOT_STARTED,
        Status.ON_GOING,
        Status.COMPLETED,
    ];

    #todosPage = signal<TodoPageResponse>({});
    todosPage = this.#todosPage.asReadonly();

    #todoState = signal<TodoState>({ isOnEditing: false });
    todoState = this.#todoState.asReadonly();

    #filterState = signal<Status>(Status.ALL);
    filterState = this.#filterState.asReadonly();

    constructor() {
        this.getTodos();
    }

    changeFilter(type: Status) {
        this.#filterState.set(type);
        this.getTodos();
    }

    filterTodos() {
        if (this.filterState() !== Status.ALL) {
        }
    }

    getTodos() {
        this.todosSubscription = this.todoApi.todosPage$.subscribe({
            next: (todos) => {
                if (todos) {
                    if (this.filterState() === Status.ALL) {
                        this.#todosPage.set(todos);
                    } else {
                        this.#todosPage.update(() => {
                            return {
                                ...todos,
                                content: todos.content?.filter(
                                    (value) =>
                                        value.status === this.filterState(),
                                ),
                            };
                        });
                    }
                }
            },
            error: (err) => {
                console.log(err);
            },
        });
    }

    startTodo(id: number) {
        this.startTodoSubscription = this.todoApi.startTodo$(id).subscribe({
            next: () => {
                this.getTodos();
            },
        });
    }

    completeTodo(id: number) {
        this.completeTodoSubscription = this.todoApi
            .completeTodo$(id)
            .subscribe({
                next: () => {
                    this.getTodos();
                },
            });
    }

    saveTodo(todo: TodoRequest) {
        if (this.todoState().isOnEditing && this.todoState()) {
            if (this.todoState().editingMode === 'ADD') {
                this.addTodoSubscription = this.todoApi.add$(todo).subscribe({
                    next: () => {
                        this.getTodos();
                        this.#todoState.set({ isOnEditing: false });
                    },
                });
            } else if (this.todoState().editingMode === 'UPDATE') {
                this.addTodoSubscription = this.todoApi
                    .update$(todo)
                    .subscribe({
                        next: () => {
                            this.getTodos();
                            this.#todoState.set({ isOnEditing: false });
                        },
                    });
            }
        }
    }

    deleteTodo(id: number) {
        this.addTodoSubscription = this.todoApi.delete$(id).subscribe({
            next: () => {
                this.getTodos();
            },
        });
    }

    setEditingState(state: TodoState) {
        this.resetTodoState();
        this.#todoState.set(state);
    }

    resetTodoState() {
        this.#todoState.set({ isOnEditing: false });
    }

    ngOnDestroy(): void {
        this.todosSubscription.unsubscribe();
        this.startTodoSubscription.unsubscribe();
        this.completeTodoSubscription.unsubscribe();
        this.getTodoSubscription.unsubscribe();
        this.addTodoSubscription.unsubscribe();
        this.updateTodoSubscription.unsubscribe();
        this.deleteTodoSubscription.unsubscribe();
    }
}
