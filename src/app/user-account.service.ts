import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { UserAccount } from './models/user-account.model';
import { IEditProfileForm } from './models/edit-profile-form.model';

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

   getUserAccountByUsername(username: string): Observable<UserAccount>{
      return this.http.get<UserAccount>(this.baseUrl + username);
    }

    getSearchResult(searchName: string): Observable<UserAccount[]>{
      return this.http.get<UserAccount[]>(this.baseUrl+"search/"+searchName);
    }
    updateProfile(formData: FormData){
      this.http.post(this.baseUrl+"editprofile", formData).subscribe(response => {
        console.log(response);
      });
    }
}
