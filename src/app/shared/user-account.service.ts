import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserAccount } from './user-account.model';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {

  baseUrl = 'https://localhost:44364/api/UserAccount'

  constructor(private http: HttpClient) { }

  getAll() : Observable<UserAccount[]> {
    return this.http.get<UserAccount[]>(this.baseUrl);
  }

  newUser(user: UserAccount): Observable<UserAccount> {
    user.userAccountId = '00000000-0000-0000-0000-000000000000';
    return this.http.post<UserAccount>(this.baseUrl, user);
  }

  getUserBySessionId(): Observable<UserAccount> {
    return this.http.get<UserAccount>(this.baseUrl+'/setting')
  }

  updateUser(user: UserAccount): Observable<UserAccount> {
    return this.http.put<UserAccount>(this.baseUrl+'/setting', user)
  }

  // getByUsername(username: string): Observable<UserAccount> {

  // }
}
