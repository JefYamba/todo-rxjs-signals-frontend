import {Component, signal} from '@angular/core';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css'
})
export class TodoItemComponent {
    updateState = signal<boolean>(false)

    changeState() {
        this.updateState.set(!this.updateState())
    }
}
