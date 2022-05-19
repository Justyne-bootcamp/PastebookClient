import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Like } from 'src/app/shared/like.model';
import { LikeService } from 'src/app/shared/like.service';
import { PostFeed } from 'src/app/shared/post.model';
import { PostService } from 'src/app/shared/post.service';

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

  constructor(private postService: PostService, private likeService: LikeService, private route: ActivatedRoute) {
    this.sessionId = localStorage.getItem("UserAccountId") as string;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.username = params.get('username')!;
    });
    this.getTimelinePosts();
  }

  getTimelinePosts(){
    this.postService.getProfilePosts(this.username)
    .subscribe(
      response => {
        this.timelineFeed = response;
        console.log(response);
      }
    )
  }


  print(postId: string){
    console.log(postId);
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
