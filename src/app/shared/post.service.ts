import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post, PostFeed } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  baseUrl = 'https://localhost:44364/api/Post'
  constructor(private http: HttpClient) { }

  newPostToNewsFeed(sessionId: string, form: FormData): Observable<Post> {
    return this.http.post<Post>(this.baseUrl, [sessionId, form]);
  }

  newPostToProfile(username: string, form: FormData): Observable<Post> {
    return this.http.post<Post>(this.baseUrl + '/pastebook.com/' + username, form)
  }

  getHomePosts(): Observable<PostFeed[]>{
    return this.http.get<PostFeed[]>(this.baseUrl+'/newsfeed')
  }

  getProfilePosts(): Observable<PostFeed[]> {
    return this.http.get<PostFeed[]>(this.baseUrl+'/timeline')
  }
}
