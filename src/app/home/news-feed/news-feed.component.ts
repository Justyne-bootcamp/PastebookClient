import { Component, OnInit } from '@angular/core';
import { PostFeed } from 'src/app/shared/post.model';
import { PostService } from 'src/app/shared/post.service';

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.css']
})
export class NewsFeedComponent implements OnInit {

  constructor(public service: PostService) { }

  newsFeed: PostFeed[];

  ngOnInit(): void {
    this.getNewsFeedPosts();
  }

  getNewsFeedPosts(){
    this.service.getHomePosts()
    .subscribe(
      response => {
        this.newsFeed = response;
        console.log(response);
      }
    )
  }

}
