import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  searchInput:string = "";
  userAccountId: string;
  username: string;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.username = localStorage.getItem("Username") as string;
    console.log(this.username);
  }

  search(){
    if(this.searchInput != ""){
      this.router.navigate(['search/'+ this.searchInput])
    .then(() => {
      window.location.reload();
    });
    }
    
  }

  logout(){
    localStorage.removeItem("UserAccountId");
    localStorage.removeItem("Username");
    console.log("logout");
    this.router.navigate(['/login']);
  }
}
