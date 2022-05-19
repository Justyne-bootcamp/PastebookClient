import { Component, OnInit } from '@angular/core';
import { UserAccountService } from '../shared/user-account.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UserAccount } from '../shared/user-account.model';
import { Router } from '@angular/router';
import Validation from '../shared/validation';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  user: UserAccount;

  registrationForm: FormGroup = new FormGroup({
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

  constructor(public service:UserAccountService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$")],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
        birthday: ['', Validators.required],
        gender: ['', Validators.required],
        mobileNumber: ['']
      },
      {validators: Validation.match('password', 'confirmPassword')}
    )
  }

  get u(): { [key: string]: AbstractControl } {
    return this.registrationForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if(this.registrationForm.invalid){
      return;
    }
    this.user = new UserAccount(this.registrationForm.value)
    this.service.newUser(this.user)
    .subscribe(
      response => {
        console.log(response);
      }
    )
    this.router.navigate(['/login']);
  }

}
