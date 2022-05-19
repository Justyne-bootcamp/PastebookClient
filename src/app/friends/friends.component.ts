import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserAccount } from '../models/user-account.model';
import { FriendService } from '../shared/friend.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  friends: UserAccount[];
  userAccountId: string;
  constructor(private friendService: FriendService, private route:ActivatedRoute) {
    this.userAccountId = this.route.snapshot.paramMap.get('userAccountId') as string;
   }

  ngOnInit(): void {
    this.friendService.getFriends(this.userAccountId).subscribe(response => {
      this.friends = response;
    });
  }

}
