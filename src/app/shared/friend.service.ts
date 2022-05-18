import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
}
