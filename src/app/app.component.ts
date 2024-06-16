import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TodoItemComponent} from "./components/todo-item/todo-item.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TodoItemComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'rxjs-signals';
}
