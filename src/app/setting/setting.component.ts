import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { UserAccount } from '../shared/user-account.model';
import Validation from '../shared/validation';
import { UserAccountService } from '../shared/user-account.service';
import { SessionService } from '../shared/session.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  sessionId: string;
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
    mobileNumber: new FormControl(''),
    currentPassword: new FormControl('')
  });
  submitted = false;

  constructor(private userAccountService:UserAccountService,
              private sessionService:SessionService ,
              private formBuilder: FormBuilder, 
              private router: Router) {
    this.sessionId = localStorage.getItem("UserAccountId") as string;
    if(this.sessionId == null){
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
    this.settingsForm = this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', [Validators.minLength(6)]],
        confirmPassword: ['', [Validators.minLength(6)]],
        birthday: ['', Validators.required],
        gender: ['', Validators.required],
        mobileNumber: [''],
        currentPassword: ['', Validators.required]

      },
      {validators: Validation.match('password', 'confirmPassword')}
    )
    this.getUser();
  }

  get u(): { [key: string]: AbstractControl } {
    return this.settingsForm.controls;
  }

  getUser(){
    this.userAccountService.getUserBySessionId(this.sessionId)
    .subscribe(
      response => {
        this.userOld = new UserAccount(response);
        let date: string[] = this.userOld.birthday.split("T");
        let birthday = date[0];
        this.settingsForm.patchValue({
          firstName: this.userOld.firstName,
          lastName: this.userOld.lastName,
          email: this.userOld.email,
          birthday: birthday,
          gender: this.userOld.gender,
          mobileNumber: this.userOld.mobileNumber
        })
        console.log(response);
      }
    )
  }

  onSubmit() {
    let currentPassword = this.settingsForm.controls['currentPassword'].value;
    let jsonCurrentPassword = "\""+ currentPassword+  "\""
    this.sessionService.settingPassword(jsonCurrentPassword)
      .subscribe(
        response => {
          this.submitted = true;
          if (this.settingsForm.invalid) {
            return;
          }
          this.userUpdate = new UserAccount(this.settingsForm.value)
          if (this.settingsForm.controls['password'].value === '') {
            this.userUpdate.password = this.settingsForm.controls['currentPassword'].value;
          }
          this.userUpdate.userAccountId = this.userOld.userAccountId
          this.userUpdate.sessionId = this.sessionId;
          this.userAccountService.updateUser(this.userUpdate)
            .subscribe(
              response => {
                console.log(response);
              }
            )
        }
      )
      this.router.navigate(['']);
  }
  
  confirmPassword(){
    let currentPassword = this.settingsForm.controls['currentPassword'].value;
    this.sessionService.settingPassword(currentPassword)
    .subscribe(
      response => {
        console.log(response);
      }
    )
  }

}
