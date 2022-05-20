import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILoginResponse } from './login-response.model';
import { ILogin } from './login.models';
import { Session, SettingChangeConfirmation } from './session.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  baseUrl = 'https://localhost:44364/api/Session';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }
  
  constructor(private http:HttpClient) { }

  settingPassword(settingChange: SettingChangeConfirmation): Observable<Session>{
    return this.http.post<Session>(this.baseUrl + '/settingPassword', settingChange)
  }

  login(login: ILogin): Observable<ILoginResponse>{
    return this.http.post<ILoginResponse>(this.baseUrl+"/login", login);
  }
}
