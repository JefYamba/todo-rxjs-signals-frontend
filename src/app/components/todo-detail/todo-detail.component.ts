import { Component, inject, input } from '@angular/core';
import { TodoResponse } from '../../core/model/todo-response';
import { Status } from '../../core/model/status';
import { DatePipe } from '@angular/common';
import { TodoService } from '../../core/service/todo.service';

@Component({
    selector: 'app-todo-detail',
    standalone: true,
    imports: [DatePipe],
    templateUrl: './todo-detail.component.html',
    styleUrl: './todo-detail.component.css',
})
export class TodoDetailComponent {
    protected readonly Status = Status;

    todoService = inject(TodoService);
    todo = input.required<TodoResponse>();

    start(todo: TodoResponse) {
        if (todo.id) {
            this.todoService.startTodo(todo.id);
        }
    }

    complete(todo: TodoResponse) {
        if (todo.id) {
            this.todoService.completeTodo(todo.id);
        }
    }

    update(todo: TodoResponse) {
        this.todoService.setEditingState({
            isOnEditing: true,
            editingMode: 'UPDATE',
            todo: todo,
        });
    }

    delete(todo: TodoResponse) {
        if (todo.id) {
            this.todoService.deleteTodo(todo.id);
        }
    }
}
