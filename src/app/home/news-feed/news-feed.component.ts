import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { CommentForm } from 'src/app/shared/comment.model';
import { CommentService } from 'src/app/shared/comment.service';
import { Like } from 'src/app/shared/like.model';
import { LikeService } from 'src/app/shared/like.service';
import { Post, PostFeed } from 'src/app/shared/post.model';
import { PostService } from 'src/app/shared/post.service';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.css']
})
export class NewsFeedComponent implements OnInit {

  sessionId:string;
  selectedFile: File | null;
  post: Post = {
    textContent:'',
    postLocation:'00000000-0000-0000-0000-000000000000',
  }

  constructor(private postService: PostService, 
              private likeService: LikeService,
              private commentService: CommentService ) {
    this.sessionId = localStorage.getItem("UserAccountId") as string;
  }

  newsFeed: PostFeed[];

  ngOnInit(): void {
    this.getNewsFeedPosts();
  }

  getNewsFeedPosts(){
    this.postService.getHomePosts(this.sessionId)
    .subscribe(
      response => {
        this.newsFeed = response;
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
    formData.append('sessionId', this.sessionId);
    this.postService.newPostToNewsFeed(formData)
    .subscribe(
      response => {
        this.ngOnInit();
        console.log(response);
      }
    )
  }

  onLike(postId: string){
    //postId = "\""+ postId+  "\""
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

  
  comment: CommentForm = {
    commentContent: ''
  }

  onComment(postId: string) {
    const formData = new FormData();
    formData.append('userAccountId', this.sessionId),
    formData.append('postId', postId),
    formData.append('commentContent', this.comment.commentContent)
    console.log(formData.get('commentContent'))
    this.commentService.newComment(formData)
    .subscribe(
      response => {
        this.ngOnInit();
        console.log(response)
      }
    )
  }

}
