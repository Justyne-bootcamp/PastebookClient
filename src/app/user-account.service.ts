import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { UserAccount } from './models/user-account.model';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {
  readonly baseUrl: string = "https://localhost:44364/api/UserAccount/";
  constructor(private http: HttpClient) {
   }

   getAllUserAccounts(): Observable<UserAccount[]>{
     return this.http.get<UserAccount[]>(this.baseUrl);
   }

   getUserAccountById(id: string): Observable<UserAccount>{
     return this.http.get<UserAccount>(this.baseUrl + "getUserAccount/" + id);
    }
}
