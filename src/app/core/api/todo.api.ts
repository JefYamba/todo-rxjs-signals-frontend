import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { ApiResponse } from '../model/api-response';
import { TodoPageResponse } from '../model/todo-page-response';
import { TodoResponse } from '../model/todo-response';
import { TodoRequest } from '../model/todo-request';

@Injectable({
    providedIn: 'root',
})
export class TodoApi {
    httpClient = inject(HttpClient);
    API_URL: string = 'http://localhost:8080/api/todos';

    todosPage$: Observable<TodoPageResponse | undefined> = this.httpClient
        .get<ApiResponse>(`${this.API_URL}`)
        .pipe(
            map(
                (apiResponse): TodoPageResponse | undefined =>
                    apiResponse.data.todos,
            ),
            catchError(this.handleErrors),
        );

    startTodo$ = (id: number) => {
        return this.httpClient
            .get<ApiResponse>(`${this.API_URL}/start/${id}`)
            .pipe(
                tap((response) => console.log(response)),
                map(
                    (apiResponse): TodoResponse | undefined =>
                        apiResponse.data.todo,
                ),
                catchError(this.handleErrors),
            );
    };
    completeTodo$ = (id: number) => {
        return this.httpClient
            .get<ApiResponse>(`${this.API_URL}/complete/${id}`)
            .pipe(
                tap((response) => console.log(response)),
                map(
                    (apiResponse): TodoResponse | undefined =>
                        apiResponse.data.todo,
                ),
                catchError(this.handleErrors),
            );
    };

    todo$ = (id: number) => {
        return this.httpClient.get<ApiResponse>(`${this.API_URL}/${id}`).pipe(
            tap((response) => console.log(response)),
            map(
                (apiResponse): TodoResponse | undefined =>
                    apiResponse.data.todo,
            ),
            catchError(this.handleErrors),
        );
    };

    add$ = (todo: TodoRequest) => {
        return this.httpClient
            .post<ApiResponse>(`${this.API_URL}/add`, todo)
            .pipe(
                tap((response) => console.log(response)),
                map(
                    (apiResponse): TodoResponse | undefined =>
                        apiResponse.data.todo,
                ),
                catchError(this.handleErrors),
            );
    };

    update$ = (todo: TodoRequest) => {
        return this.httpClient
            .put<ApiResponse>(`${this.API_URL}/update`, todo)
            .pipe(
                tap((response) => console.log(response)),
                map(
                    (apiResponse): TodoResponse | undefined =>
                        apiResponse.data.todo,
                ),
                catchError(this.handleErrors),
            );
    };

    delete$ = (id: number) => {
        return this.httpClient
            .delete<ApiResponse>(`${this.API_URL}/delete/${id}`)
            .pipe(catchError(this.handleErrors));
    };

    private handleErrors(error: HttpErrorResponse): Observable<never> {
        console.log(error);

        return throwError(() => {
            return new Error(`An error occurred - Error code: ${error.status}`);
        });
    }
}
