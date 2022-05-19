import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRelationshipResponse } from './relationship-response.model';

@Injectable({
  providedIn: 'root'
})
export class FriendService {
  baseUrl = 'https://localhost:44364/api/Friend/';
  
  constructor(private http: HttpClient) { }

  addFriend(userAccountId: string, receiverAccountId: string){
    this.http.post(this.baseUrl+"addFriend", {userAccountId: userAccountId, friendRequestReceiver: receiverAccountId})
    .subscribe(response =>{
      console.log(response);
    });
  }

  getRelationship(userAccountId: string, receiverAccountId: string): Observable<IRelationshipResponse>{
    return this.http.post<IRelationshipResponse>(this.baseUrl+"relationship", {userAccountId: userAccountId, receiverAccountId: receiverAccountId});
  }

  respondToRequest(friendId: string, response: string){
    this.http.post(this.baseUrl+"respondToRequest", {friendId: friendId, response: response}).subscribe(res => {
      console.log(res);
    });
  }
}
