import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Car } from '../../shared/car.model';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  private apiUrl = environment.apiUrl + "/cars";
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getCars(marca: string | undefined | null): Observable<Car[]> {
    let params = new HttpParams();
    if (marca) {
      params = params.append('marca', marca);
    }

    let httpOptions = { ...this.httpOptions, params: params };
    return this.http.get<Car[]>(this.apiUrl, httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  getCarById(id: string): Observable<Car> {
    return this.http.get<Car>(this.apiUrl + "/" + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  create(car: any): Observable<Car> {
    return this.http.post<Car>(this.apiUrl, JSON.stringify(car), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  createCarMultipleImages(car: any): Observable<any> {
    return this.http.post(this.apiUrl + "/car-multiple-images", car)
      .pipe(
        catchError(this.errorHandler)
      );
  }


  errorHandler(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => error);
  }

}
