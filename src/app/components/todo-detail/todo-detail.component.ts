import { Component, inject, input } from '@angular/core';
import { TodoResponse } from '../../core/model/todo-response';
import { Status } from '../../core/model/status';
import { DatePipe } from '@angular/common';
import { tap } from 'rxjs';
import { TodoApi } from '../../core/api/todo.api';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'app-todo-detail',
    standalone: true,
    imports: [DatePipe],
    templateUrl: './todo-detail.component.html',
    styleUrl: './todo-detail.component.css',
    animations: [
        trigger('fadeInOut', [
            transition(':enter', [
                style({ opacity: 0, height: '0px' }),
                animate('0.35s', style({ opacity: 1, height: '*' })),
            ]),
            transition(':leave', [
                style({ opacity: 1, height: '*' }),
                animate('0.35s', style({ opacity: 0, height: '0px' })),
            ]),
        ]),
    ],
})
export class TodoDetailComponent {
    todoApi = inject(TodoApi);
    todo = input.required<TodoResponse>();
    isOpened = input.required<boolean>();

    protected readonly Status = Status;

    start(todo: TodoResponse) {
        this.todoApi.startTodo$(todo.id).pipe(
            tap({
                next: (res) => {},
                error: (e: Error) => {
                    console.error(e);
                },
            }),
        );
    }

    complete(todo: TodoResponse) {}

    update(todo: TodoResponse) {}

    delete(todo: TodoResponse) {}
}
