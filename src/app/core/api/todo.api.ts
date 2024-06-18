import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { ApiResponse } from '../model/api-response';

@Injectable({
    providedIn: 'root',
})
export class TodoApi {
    httpClient = inject(HttpClient);
    API_URL: string = 'http://localhost:8080/api/todos';

    todos$ = this.httpClient
        .get<ApiResponse>(`${this.API_URL}`)
        .pipe(catchError(this.handleErrors));

    startTodo$ = (id: number) =>
        this.httpClient.get<ApiResponse>(`${this.API_URL}/start/${id}`).pipe(
            tap((value) => console.log(value)),
            catchError(this.handleErrors),
        );

    private handleErrors(error: HttpErrorResponse): Observable<never> {
        console.log(error);

        return throwError(() => {
            return new Error(`An error occurred - Error code: ${error.status}`);
        });
    }
}
