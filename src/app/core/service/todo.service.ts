import {
    inject,
    Injectable,
    OnDestroy,
    signal,
    WritableSignal,
} from '@angular/core';
import { TodoApi } from '../api/todo.api';
import { Subscription } from 'rxjs';
import { TodoRequest } from '../model/todo-request';
import { Status } from '../model/status';
import { TodoResponse } from '../model/todo-response';

export interface AppState {
    isOnEditState: boolean;
    editingMode?: 'ADD' | 'UPDATE';
    todo?: TodoResponse;
    todos: TodoResponse[];
    filter: Status;
    filteredTodos: TodoResponse[];
    searchKey: string;
}

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

    #appState: WritableSignal<AppState> = signal<AppState>({
        isOnEditState: false,
        filter: Status.ALL,
        todos: [],
        filteredTodos: [],
        searchKey: '',
    });
    appState = this.#appState.asReadonly();

    constructor() {
        this.getTodos();
    }

    setFilter(filter: Status) {
        this.#appState.update((value) => {
            return {
                ...value,
                filter: filter,
            };
        });
        this.filterTodos();
    }

    setSearchKey(search: string) {
        this.#appState.update((value) => {
            return { ...value, searchKey: search };
        });
    }

    setEditStateMode(
        state: boolean,
        mode: 'ADD' | 'UPDATE' | undefined,
        todo: TodoResponse | undefined,
    ) {
        this.#appState.update((appState) => {
            return {
                ...appState,
                isOnEditState: state,
                editingMode: mode,
                todo: todo,
            };
        });
    }

    getTodos() {
        this.todosSubscription = this.todoApi.todosPage$.subscribe({
            next: (todos) => {
                if (todos) {
                    this.#appState.update((value) => {
                        return {
                            ...value,
                            todos: todos ? todos : [],
                        };
                    });
                    this.filterTodos();
                }
            },
            error: (err) => {
                console.log(err);
            },
        });
    }

    startTodo(id: number) {
        this.startTodoSubscription = this.todoApi.startTodo$(id).subscribe({
            next: (todoResponse) => {
                // this.getTodos();
                this.refreshTodos(todoResponse);
            },
        });
    }

    completeTodo(id: number) {
        this.completeTodoSubscription = this.todoApi
            .completeTodo$(id)
            .subscribe({
                next: (todoResponse) => {
                    // this.getTodos();
                    this.refreshTodos(todoResponse);
                },
            });
    }

    saveTodo(todo: TodoRequest) {
        if (this.appState().isOnEditState) {
            if (this.appState().editingMode === 'ADD') {
                this.addTodoSubscription = this.todoApi.add$(todo).subscribe({
                    next: (todoResponse) => {
                        // this.getTodos();
                        if (todoResponse) {
                            this.#appState.update((value) => {
                                return {
                                    ...value,
                                    todos: [todoResponse, ...value.todos],
                                };
                            });
                            this.resetEditStateMode();
                            this.filterTodos();
                        }
                    },
                });
            } else if (this.appState().editingMode === 'UPDATE') {
                this.addTodoSubscription = this.todoApi
                    .update$(todo)
                    .subscribe({
                        next: (todoResponse) => {
                            // this.getTodos();
                            this.resetEditStateMode();
                            this.refreshTodos(todoResponse);
                        },
                    });
            }
        }
    }

    deleteTodo(id: number) {
        this.addTodoSubscription = this.todoApi.delete$(id).subscribe({
            next: () => {
                this.#appState.update((appState) => {
                    return {
                        ...appState,
                        todos: appState.todos.filter(
                            (value) => value.id !== id,
                        ),
                    };
                });
                this.filterTodos();
            },
        });
    }

    private refreshTodos(todoResponse: TodoResponse | undefined) {
        if (todoResponse) {
            this.#appState.update((value) => {
                return {
                    ...value,
                    todos: value.todos.map((todo) => {
                        if (todo.id == todoResponse.id) {
                            return todoResponse;
                        } else {
                            return todo;
                        }
                    }),
                };
            });
            this.filterTodos();
        }
    }

    private filterTodos() {
        this.#appState.update((appState) => {
            return {
                ...appState,
                filteredTodos:
                    appState.filter === 'ALL'
                        ? appState.todos
                        : appState.todos.filter(
                              (value) => value.status === appState.filter,
                          ),
            };
        });
    }

    resetEditStateMode() {
        this.setEditStateMode(false, undefined, undefined);
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
