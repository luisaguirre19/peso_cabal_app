import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { retry, catchError, finalize } from 'rxjs/operators';
import { Observable, throwError, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SqlService {
  //base_path: string = 'https://coffee-benef.azurewebsites.net/api/count';
  // base_path: string = 'http://localhost:8097/api/';
  // base_path_beneficio: string = 'http://localhost:8091/api/';

 // base_path_peso: string = 'http://localhost:8097/api/';

  base_path: string = 'https://coffee-dv.azurewebsites.net/api/';
  base_path_beneficio: string = 'https://coffee-benef.azurewebsites.net/api/';
  base_path_peso: string = 'https://pesocabal.azurewebsites.net/api/';

  httpOptions = {
    headers: new HttpHeaders({
      Authorization:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjoic2VsdmluIiwicHJvZHVjdG9yIjoicGVzb2NhYmFsQGdtYWlsLmNvbSIsImlhdCI6MTcxNjIyNDY2OX0.I1WO33aeRd05rsvmfRoH66mfuQGUc58xSfyA7nYjzW8',
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  getData(ruta: string) {
    return this.http
      .get<any[]>(this.base_path + ruta, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  postData(ruta: string, item) {
    return this.http
      .post(this.base_path + ruta, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  ////////////
  getData_peso(ruta: string) {
    return this.http
      .get<any[]>(this.base_path_peso + ruta, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  postData_peso(ruta: string, item) {
    return this.http
      .post(this.base_path_peso + ruta, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  ////////////

  putData(
    ruta: string,
    param: string,
    id: number,
    param2: string,
    estado: string
  ) {
    return this.http
      .put(
        this.base_path + ruta + `?${param}=${id}&${param2}=${estado}`,
        this.httpOptions
      )
      .pipe(retry(2), catchError(this.handleError));
  }

  deleteData(ruta: string, param: string,   id: number) {
    return this.http
      .delete(this.base_path + ruta + `?${param}=${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  postData_beneficio(ruta: string, item) {
    return this.http
      .post(
        this.base_path_beneficio + ruta,
        JSON.stringify(item),
        this.httpOptions
      )
      .pipe(retry(2), catchError(this.handleError));
  }

  getData_envio(ruta: string, param: string, id: number) {
    return this.http
      .get(this.base_path + ruta + `?${param}=${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
