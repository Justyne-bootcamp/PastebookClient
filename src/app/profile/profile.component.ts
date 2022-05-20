import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FriendService } from '../shared/friend.service';
import { UserAccount } from '../shared/user-account.model';
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
  relationship: string;
  friendId: string;
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

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
   }

  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get('username') as string;
    this.userAccountService.getUserAccountByUsername(this.username)
    .subscribe(user => {
      this.user = user;
      this.receiverAccountId = user.userAccountId;

      this.getRelationship();
    });
  }

  getRelationship(){
    if(this.receiverAccountId == this.userAccountId){
      this.relationship = "self";
    }else{
      this.friendService.getRelationship(this.receiverAccountId, this.userAccountId).subscribe(response => {
        this.relationship = response.relationship;
        this.friendId = response.friendId;
      });
    }
    
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
    window.location.reload();
  }
  respondToRequest(response: string){
    this.friendService.respondToRequest(this.friendId, response);
    window.location.reload();
  }
}
