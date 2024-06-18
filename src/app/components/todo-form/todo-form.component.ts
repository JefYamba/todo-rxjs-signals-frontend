import { Component, inject } from '@angular/core';
import { TodoEditingStateService } from '../../core/service/todo-editing-state.service';
import { TodoEditingState } from '../../core/model/todo-editing-state';

@Component({
    selector: 'app-todo-form',
    standalone: true,
    imports: [],
    templateUrl: './todo-form.component.html',
    styleUrl: './todo-form.component.css',
})
export class TodoFormComponent {
    todoEditingStateService = inject(TodoEditingStateService);
    todoState$ = this.todoEditingStateService.getEditingState();

    save() {}

    cancel() {
        this.todoEditingStateService.setEditingState({
            state: TodoEditingState.EDITING_OFF,
        });
    }
}
