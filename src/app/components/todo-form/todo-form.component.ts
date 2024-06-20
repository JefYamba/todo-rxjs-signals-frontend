import { Component, effect, inject } from '@angular/core';
import { TodoService } from '../../core/service/todo.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { FormsModule } from '@angular/forms';
import { TodoRequest } from '../../core/model/todo-request';

@Component({
    selector: 'app-todo-form',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './todo-form.component.html',
    styleUrl: './todo-form.component.css',
    animations: [
        trigger('fadeInOut', [
            transition(':enter', [
                style({ opacity: 0, height: '0px' }),
                animate('0.3s', style({ opacity: 1, height: '380px' })),
            ]),
            transition(':leave', [
                style({ opacity: 1, height: '380px' }),
                animate('0.3s', style({ opacity: 0, height: '0px' })),
            ]),
        ]),
    ],
})
export class TodoFormComponent {
    todoService = inject(TodoService);
    todoState = this.todoService.todoState;

    todoRequest: TodoRequest = { id: 0, title: '', content: '' };

    constructor() {
        this.initForm();
    }

    initForm() {
        effect(() => {
            this.todoRequest = {
                id: this.todoState().todo?.id,
                title: this.todoState().todo?.title,
                content: this.todoState().todo?.content,
            };
        });
    }

    save() {
        this.todoService.saveTodo(this.todoRequest);
    }

    cancel() {
        this.todoService.resetTodoState();
    }

    add() {
        this.todoService.setEditingState({
            isOnEditing: true,
            editingMode: 'ADD',
        });
    }
}
