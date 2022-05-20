import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from '../shared/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  errorMessage?: string;
  submitted: boolean = false;
  constructor(private sessionService: SessionService, fb: FormBuilder, private router: Router) {
    this.loginForm = fb.group({
      email: ["",[Validators.required]],
      password: ["", Validators.required]
    });
   }

  ngOnInit(): void {
   
  }

  onSubmit(){
    this.submitted = true;
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

