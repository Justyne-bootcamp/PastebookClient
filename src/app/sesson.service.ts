import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { ILoginResponse } from './models/login-response.model';
import { ILogin } from './models/login.models';
import { IToken } from './models/token.model';

@Injectable({
  providedIn: 'root'
})
export class SessonService {
  readonly baseUrl:string = "https://localhost:44364/api/Session/";
  
  constructor(private http:HttpClient) { }


  login(login: ILogin): Observable<ILoginResponse>{
    return this.http.post<ILoginResponse>(this.baseUrl+"login", login);
  }

  getSessionUsername(): Observable<string>{
    return this.http.get<string>(this.baseUrl+"/username");
  }

}

