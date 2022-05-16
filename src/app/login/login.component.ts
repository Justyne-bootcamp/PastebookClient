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
      email: ["sana@example.com", [Validators.required]],
      password: ["imtwice", Validators.required]
    });
   }

  ngOnInit(): void {
   
  }

  onSubmit(){
    console.log(this.loginForm.value);
    this.sessionService.login(this.loginForm.value).subscribe((response) =>{
      console.log(response);
      this.router.navigate(['']);
    }, (err) => {
      console.log(err.message);
      this.errorMessage = "Incorrect Credential";
    });
  }
}
