import { Component, OnInit } from '@angular/core';
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

  constructor(private postService: PostService, private likeService: LikeService) { }

  ngOnInit(): void {
    this.getTimelinePosts();
  }

  getTimelinePosts(){
    this.postService.getHomePosts()
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
    postId = "\""+ postId+  "\""
    this.likeService.postLike(postId)
    .subscribe(
      response => {
        console.log(response);
      }
    )
  }

}
