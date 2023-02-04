import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders ,HttpParams ,HttpErrorResponse} from '@angular/common/http';
import { JwtService } from '../../shared/services/jwt.service';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class ApiService {
  constructor(
    private http: HttpClient,
    private jwtService: JwtService,
    // private sessionService: SessionService
  ) {}

  private setHeaders(headers: any = {}): HttpHeaders {
    headers['Accept'] = 'application/json';
    if (this.jwtService.getToken()) {
      headers['Authorization'] = `${this.jwtService.getToken()}`;
    }
    return new HttpHeaders(headers);
  }

  private formatErrors(error: any) {
      if (error.status === 500) {
        return throwError(error.error);
      } else if (error.status === 400) {
        return throwError(error.error);
      } else if (error.status === 409) {
        return throwError(error);
      } else if (error.status === 406) {
        return throwError(error);
      } else {
        return throwError(error);
      }
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.api_url}${path}`, { headers: this.setHeaders({}), params })
    .pipe(
      tap( // Log the result or error
        data =>{
          return data
        },
        error => {
          this.formatErrors(error)
        }
    ));
  }
}
