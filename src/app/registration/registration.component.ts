import { Component, OnInit } from '@angular/core';
import { UserAccountService } from '../shared/user-account.service';
import { NgForm } from '@angular/forms';
import { UserAccount } from '../shared/user-account.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  user: UserAccount = {
    userAccountId: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    birthday: '',
    gender: '',
    mobileNumber: '',
  }

  constructor(public service:UserAccountService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.service.newUser(this.user)
    .subscribe(
      response => {
        console.log(response);
      }
    )
  }

}
