import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { FormTemplate } from './../../shared/form-template.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormTemplateService {

  private apiCarsUrl = environment.apiUrl + "/cars";
  private apiFormTemplateUrl = environment.apiUrl + "/formTemplate";
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getFormTemplates(): Observable<FormTemplate[]> {
    return this.http.get<FormTemplate[]>(this.apiFormTemplateUrl, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  getFormTemplateByName (name: string): Observable<FormTemplate> {
    return this.http.get<FormTemplate>(this.apiFormTemplateUrl + "/name/" + name, this.httpOptions)
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
