import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) {
    let userAccountId = localStorage.getItem("UserAccountId") as string;
    if(userAccountId == null){
      this.router.navigate(['/login']);
    }
   }

  ngOnInit(): void {
  }

}
