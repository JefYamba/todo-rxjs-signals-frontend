import { Component, effect, inject } from '@angular/core';
import { TodoService } from '../../core/service/todo.service';
import { FormsModule } from '@angular/forms';
import { TodoRequest } from '../../core/model/todo-request';

@Component({
    selector: 'app-todo-form',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './todo-form.component.html',
    styleUrl: './todo-form.component.css',
})
export class TodoFormComponent {
    todoService = inject(TodoService);
    todoRequest: TodoRequest = { id: 0, title: '', content: '' };

    constructor() {
        this.initForm();
    }

    initForm() {
        effect(() => {
            this.todoRequest = {
                id: this.todoService.appState().todo?.id,
                title: this.todoService.appState().todo?.title,
                content: this.todoService.appState().todo?.content,
            };
        });
    }

    save() {
        this.todoService.saveTodo(this.todoRequest);
    }

    cancel() {
        this.todoService.resetEditStateMode();
    }

    add() {
        /*this.todoService.setEditingState({
            isOnEditing: true,
            editingMode: 'ADD',
        });*/
        this.todoService.setEditStateMode(true, 'ADD', undefined);
    }
}
