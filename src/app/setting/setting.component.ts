import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { UserAccount } from '../shared/user-account.model';
import Validation from '../shared/validation';
import { UserAccountService } from '../shared/user-account.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  userOld: UserAccount;
  userUpdate: UserAccount;

  settingsForm: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    birthday: new FormControl(''),
    gender: new FormControl(''),
    mobileNumber: new FormControl('')
  });
  submitted = false;

  constructor(public service:UserAccountService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.settingsForm = this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
        birthday: ['', Validators.required],
        gender: ['', Validators.required],
        mobileNumber: ['']
      },
      {validators: Validation.match('password', 'confirmPassword')}
    )
    this.getUser();
  }

  get u(): { [key: string]: AbstractControl } {
    return this.settingsForm.controls;
  }

  getUser(){
    this.service.getUserBySessionId()
    .subscribe(
      response => {
        this.userOld = new UserAccount(response);
        this.settingsForm.patchValue({
          firstName: this.userOld.firstName,
          lastName: this.userOld.lastName,
          email: this.userOld.email,
          birthday: this.userOld.birthday,
          gender: this.userOld.gender,
          mobileNumber: this.userOld.mobileNumber
        })
        console.log(response);
      }
    )
  }

  onSubmit() {
    this.submitted = true;
    if(this.settingsForm.invalid){
      return;
    }
    this.userUpdate = new UserAccount(this.settingsForm.value)
    this.userUpdate.userAccountId = this.userOld.userAccountId
    this.service.updateUser(this.userUpdate)
    .subscribe(
      response => {
        console.log(response);
      }
    )
    console.log(this.userUpdate)
  }

}
