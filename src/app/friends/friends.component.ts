import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FriendService } from '../shared/friend.service';
import { UserAccount } from '../shared/user-account.model';

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
