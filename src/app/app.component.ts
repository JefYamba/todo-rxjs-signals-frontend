import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { TodoApi } from './core/api/todo.api';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { Status } from './core/model/status';
import { TodoEditingState } from './core/model/todo-editing-state';
import { TodoEditingStateService } from './core/service/todo-editing-state.service';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { animate, style, transition, trigger } from '@angular/animations';
import { TodoDetailComponent } from './components/todo-detail/todo-detail.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        TodoItemComponent,
        AsyncPipe,
        JsonPipe,
        TodoFormComponent,
        TodoDetailComponent,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    animations: [
        trigger('fadeInOut', [
            transition(':enter', [
                style({ opacity: 0, height: '0px' }),
                animate('0.35s', style({ opacity: 1, height: '380px' })),
            ]),
            transition(':leave', [
                style({ opacity: 1, height: '380px' }),
                animate('0.35s', style({ opacity: 0, height: '0px' })),
            ]),
        ]),
    ],
})
export class AppComponent {
    todoApi = inject(TodoApi);
    todoEditingStateService = inject(TodoEditingStateService);

    todos$ = this.todoApi.todos$;
    todoState$ = this.todoEditingStateService.getEditingState();

    protected readonly Status = Status;

    save() {}

    cancel() {}

    protected readonly TodoEditingState = TodoEditingState;

    getEditState() {
        this.todoEditingStateService.setEditingState({
            state: TodoEditingState.EDITING_ON,
        });
    }
}
