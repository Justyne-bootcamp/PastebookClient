import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserAccount } from '../models/user-account.model';
import { UserAccountService } from '../user-account.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  users: UserAccount[];
  constructor(private userAccountService: UserAccountService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    let searchName = this.route.snapshot.paramMap.get("searchName") as string;
    this.userAccountService.getSearchResult(searchName).subscribe(response => {
      this.users = response;
    });
  }

}
