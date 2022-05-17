import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  baseUrl = 'https://localhost:44364/api/Post'
  constructor(private http: HttpClient) { }

  newPostToNewsFeed(form: FormData): Observable<Post> {
    return this.http.post<Post>(this.baseUrl, form);
  }

  newPostToProfile(username: string, form: FormData): Observable<Post> {
    return this.http.post<Post>(this.baseUrl + '/pastebook.com/' + username, form)
  }
}