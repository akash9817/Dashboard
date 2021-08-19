import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User, Response } from './app.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {
    private apiUrl = `http://localhost:3000`;
    //private handleError: HandleError;

    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    constructor(
      private http: HttpClient
    ) {}

    handleError(error: HttpErrorResponse) {
      return observableThrowError(error);
    }

    redirectUrl: string;


    getUsers(): Observable<Response> {
      return this.http.get<Response>(`${this.apiUrl}`)
      .pipe(
        catchError(this.handleError))
    }

    getUser(id: number) {
      return this.http.get<Response>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error)
        }))
    }

    addUser(user: User) {
      return this.http.post<string>(`${this.apiUrl}/add`, user, this.httpOptions)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error)
        }))
    }

    updateUser(user: User) {
      return this.http.put<string>(`${this.apiUrl}/update`, user, this.httpOptions)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error)
        }))
    }

    deleteUser(id: number) {
      return this.http.delete(`${this.apiUrl}/delete/${id}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error.error)
        }))
    }

}