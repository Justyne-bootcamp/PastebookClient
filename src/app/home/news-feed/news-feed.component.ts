import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { Like } from 'src/app/shared/like.model';
import { LikeService } from 'src/app/shared/like.service';
import { PostFeed } from 'src/app/shared/post.model';
import { PostService } from 'src/app/shared/post.service';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.css']
})
export class NewsFeedComponent implements OnInit {

  sessionId:string;

  constructor(private postService: PostService, private likeService: LikeService) {
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
        console.log(response);
      }
    )
  }

}
