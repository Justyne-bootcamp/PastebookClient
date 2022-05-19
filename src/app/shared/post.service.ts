import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post, PostFeed } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  baseUrl = 'https://localhost:44364/api/Post'
  constructor(private http: HttpClient) { }

  newPostToNewsFeed(form: FormData): Observable<Post> {
    return this.http.post<Post>(this.baseUrl, form);
  }

  newPostToProfile(form: FormData): Observable<Post> {
    return this.http.post<Post>(this.baseUrl + '/posttoprofile', form)
  }

  getHomePosts(sessionId: string): Observable<PostFeed[]>{
    let params = new HttpParams();
    params = params
    .set('sessionId', sessionId);
    return this.http.get<PostFeed[]>(this.baseUrl+'/newsfeed', {params: params})
  }

  getProfilePosts(username: string): Observable<PostFeed[]> {
    let params = new HttpParams();
    params = params
    .set('username', username);
    return this.http.get<PostFeed[]>(this.baseUrl+'/timeline', {params: params})
  }
}
