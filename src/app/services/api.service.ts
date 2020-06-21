import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = 'https://abcd.com/';

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error(error.error);
      return error.error.message;
    } 
    console.error(error.error);
    return 'Something Went Wrong. Please Try After Sometime.';
  }
  
  getRequest(url): Observable<any> {
    console.log('URL : ', url);
    return this.http.get(url);
  }

  postRequest(url, body): Observable<any> {
    return this.http.post(url, body).pipe(catchError(this.handleError));
  }
}
