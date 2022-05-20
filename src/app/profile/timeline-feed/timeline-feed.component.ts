import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserAccount } from 'src/app/shared/user-account.model';
import { Like } from 'src/app/shared/like.model';
import { LikeService } from 'src/app/shared/like.service';
import { Post, PostFeed } from 'src/app/shared/post.model';
import { PostService } from 'src/app/shared/post.service';
import { UserAccountService } from 'src/app/shared/user-account.service';

@Component({
  selector: 'app-timeline-feed',
  templateUrl: './timeline-feed.component.html',
  styleUrls: ['./timeline-feed.component.css']
})
export class TimelineFeedComponent implements OnInit {

  timelineFeed: PostFeed[];
  likerId: string;
  liked: Like;
  sessionId: string;
  username: string;
  currentUser: UserAccount;

  selectedFile: File | null;
  post: Post = {
    textContent:'',
    postLocation:'00000000-0000-0000-0000-000000000000',
  }
  constructor(private userService: UserAccountService,
              private postService: PostService, 
              private likeService: LikeService, 
              private route: ActivatedRoute) {
    this.sessionId = localStorage.getItem("UserAccountId") as string;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.username = params.get('username')!;
    });
    this.getTimelinePosts();
    this.getCurrentUser();
  }

  getCurrentUser(){
    this.userService.getUserBySessionId(this.sessionId)
    .subscribe(
      response => {
        this.currentUser = new UserAccount(response);
      }
    )
  }

  getTimelinePosts(){
    this.postService.getProfilePosts(this.username, this.sessionId)
    .subscribe(
      response => {
        this.timelineFeed = response;
        console.log(response);
      }
    )
  }
  onFileSelected(event:any){
    this.selectedFile=<File>event.target.files[0];
  }
  
  onSubmit() {
    const formData = new FormData();
    if(this.selectedFile != null){
      formData.append('photo',this.selectedFile);
    }
    formData.append('textContent', this.post.textContent);
    formData.append('postLocation', this.post.postLocation);
    formData.append('username', this.username)
    formData.append('sessionId', this.sessionId)
    this.postService.newPostToProfile(formData)
    .subscribe(
      response => {
        this.ngOnInit();
        console.log(response);
      }
    )
  }

  onLike(postId: string){
    const formData = new FormData();
    formData.append('postId', postId);
    formData.append('sessionId', this.sessionId)
    console.log(formData.get('sessionId'))
    console.log(formData.get('postId'))
    this.likeService.postLike(formData)
    .subscribe(
      response => {
        this.ngOnInit();
        console.log(response);
      }
    )
  }

}
