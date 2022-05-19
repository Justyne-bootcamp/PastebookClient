import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ILogin } from '../models/login.models';
import { SessonService } from '../sesson.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  errorMessage?: string;
  constructor(private sessionService: SessonService, fb: FormBuilder, private router: Router) {
    this.loginForm = fb.group({
      email: ["john@gmail.com", [Validators.required]],
      password: ["testing", Validators.required]
    });
   }

  ngOnInit(): void {
   
  }

  onSubmit(){
    this.sessionService.login(this.loginForm.value).subscribe((response) =>{
      localStorage.setItem("UserAccountId", response.userAccountId);
      localStorage.setItem("Username", response.username);
      this.router.navigate(['']);
    }, (err) => {
      console.log(err.message);
      this.errorMessage = "Incorrect Email or Password";
    });    
  }
}

