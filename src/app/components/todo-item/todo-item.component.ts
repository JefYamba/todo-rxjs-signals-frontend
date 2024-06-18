import { Component, input, signal } from '@angular/core';
import { TodoResponse } from '../../core/model/todo-response';
import { Status } from '../../core/model/status';
import { DatePipe, JsonPipe, NgClass } from '@angular/common';
import { TodoDetailComponent } from '../todo-detail/todo-detail.component';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'app-todo-item',
    standalone: true,
    imports: [NgClass, DatePipe, JsonPipe, TodoDetailComponent],
    templateUrl: './todo-item.component.html',
    styleUrl: './todo-item.component.css',
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
export class TodoItemComponent {
    isOpened = signal<boolean>(false);
    todo = input.required<TodoResponse>();

    protected readonly Status = Status;

    constructor() {}

    changeState() {
        this.isOpened.set(!this.isOpened());
    }
}
