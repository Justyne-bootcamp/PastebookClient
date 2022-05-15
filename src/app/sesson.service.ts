import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ILogin } from './models/login.models';

@Injectable({
  providedIn: 'root'
})
export class SessonService {
  readonly baseUrl:string = "https://localhost:44364/api/Session/";

  constructor(private http:HttpClient) { }


  login(login: ILogin){
    return this.http.post(this.baseUrl+"login", login);
  }

  getSessionUsername(): Observable<string>{
    return this.http.get<string>(this.baseUrl+"/username");
  }

}

