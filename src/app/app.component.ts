import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { TodoService } from './core/service/todo.service';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { TodoDetailComponent } from './components/todo-detail/todo-detail.component';
import { Status } from './core/model/status';
import { FormsModule } from '@angular/forms';

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
        FormsModule,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent {
    todoService = inject(TodoService);

    currentFilter: Status = Status.ALL;

    getFilterText(filter: Status) {
        switch (filter) {
            case Status.ALL:
                return 'All';
            case Status.NOT_STARTED:
                return 'Not Started';
            case Status.ON_GOING:
                return 'On going';
            case Status.COMPLETED:
                return 'Completed';
        }
    }

    filterChange() {
        this.todoService.setFilter(this.currentFilter);
    }
}
