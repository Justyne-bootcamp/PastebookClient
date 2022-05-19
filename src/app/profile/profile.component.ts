import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAccount } from '../models/user-account.model';
import { FriendService } from '../shared/friend.service';
import { UserAccountService } from '../user-account.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  receiverAccountId: string;
  username: string;
  user!:UserAccount;
  showModalChecker: boolean = false;
  editForm: FormGroup;
  addFriendForm: FormGroup;
  selectedFile: File | null;
  userAccountId: string;
  constructor(private userAccountService: UserAccountService,
    private route:ActivatedRoute,
    private fb: FormBuilder,
    private friendService: FriendService,
    private router: Router) {
      
    this.userAccountId = localStorage.getItem("UserAccountId") as string;

    if(this.userAccountId == null){
      this.router.navigate(['/login']);
    }

    this.editForm = fb.group({
      aboutMe: [""],
      profilePicture: [""],
      userAccountId: [this.userAccountId]
    });

   
   }

  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get('username') as string;
    this.userAccountService.getUserAccountByUsername(this.username)
    .subscribe(user => {
      this.user = user;
      this.receiverAccountId = user.userAccountId;
    });


  }

  showModal(){
    this.showModalChecker = true;
  }
  closeModal(){
    this.showModalChecker = false;;
  }

  onFileSelected(event:any){
    this.selectedFile=<File>event.target.files[0];
  }

  submitEditForm(){
    const formData = new FormData();

    if(this.selectedFile != null){
      formData.append("profilePicture", this.selectedFile)
    }
    if(this.editForm.get('aboutMe')?.value != ""){

      formData.append("aboutMe", this.editForm.get('aboutMe')?.value);
    }
    formData.append("userAccountId", this.editForm.get('userAccountId')?.value)
    console.log(formData);
    this.userAccountService.updateProfile(formData);
    this.closeModal();
    window.location.reload();
  }

  addFriend(){
    console.log(this.userAccountId + " " + this.receiverAccountId);
    this.friendService.addFriend(this.userAccountId, this.receiverAccountId);
  }
}
