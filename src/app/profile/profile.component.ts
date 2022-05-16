import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserAccount } from '../models/user-account.model';
import { UserAccountService } from '../user-account.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user!:UserAccount;

  constructor(private userAccountService: UserAccountService, private route:ActivatedRoute) {
   }

  ngOnInit(): void {
    let username = this.route.snapshot.paramMap.get('username') as string;
    this.userAccountService.getUserAccountByUsername(username)
    .subscribe(user => {
      this.user = user; 
    });


    console.log(JSON.stringify(this.user));
  }
}
