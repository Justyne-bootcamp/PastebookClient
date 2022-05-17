import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserAccount } from '../models/user-account.model';
import { UserAccountService } from '../user-account.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user!:UserAccount;
  showAboutMeModal: boolean = false;
  editForm: FormGroup;
  selectedFile: File | null;

  constructor(private userAccountService: UserAccountService, private route:ActivatedRoute, private fb: FormBuilder) {
    this.editForm = fb.group({
      aboutMe: [""],
      profilePicture: [""]
    });
   }

  ngOnInit(): void {
    let username = this.route.snapshot.paramMap.get('username') as string;
    this.userAccountService.getUserAccountByUsername(username)
    .subscribe(user => {
      this.user = user; 
    });
  }

  showAboutMe(value: boolean){
    this.showAboutMeModal = value;
  }

  onFileSelected(event:any){
    this.selectedFile=<File>event.target.files[0];
  }

  submitEditForm(){
    const formData = new FormData();

    if(this.selectedFile != null){
      formData.append("profilePicture", this.selectedFile)
    }
    formData.append("aboutMe", this.editForm.get('aboutMe')?.value);

    console.log(formData);
    this.userAccountService.updateProfile(formData);
    this.showAboutMeModal = false;
  }
}
