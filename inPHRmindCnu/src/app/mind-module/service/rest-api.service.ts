import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {MindManager} from '../mind.manager';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor(
      private http: HttpClient,
      private mindManager: MindManager
  ) { }

  // TODO 에러 처리 필요
  private handleError(error: HttpErrorResponse) {

    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(error.status + '/' + error.error.message);
  }

  private extractData(res: Response) {
    const body = res;
    return body || { };
  }

  getDatas(url: string): Observable<any> {
    return this.http.get(url).pipe(
        map(this.extractData),
        catchError(this.handleError));
  }

  updateData(url: string, data: any): Observable<any> {
    return this.http.put(url, data)
        .pipe(
            catchError(this.handleError)
        );
  }

  deleteData(url: string): Observable<any> {
    return this.http.delete(url)
        .pipe(
            catchError(this.handleError)
        );
  }


  postData(url: string, data: any): Observable<any> {
    return this.http.post(url, data)
        .pipe(
            catchError(this.handleError)
        );
  }

  getData(url: string): Observable<any> {
    return this.http.get(url).pipe(
        map(this.extractData),
        catchError(this.handleError));
  }

  putData(url: string, data: any): Observable<any> {
    return this.http.put(url, data)
        .pipe(
            catchError(this.handleError)
        );
  }


}

