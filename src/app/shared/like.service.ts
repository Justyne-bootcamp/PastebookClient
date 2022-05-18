import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Like } from './like.model';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  baseUrl = 'https://localhost:44364/api/Like'
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }
  constructor(private http:HttpClient) { }

  postLike(postStringId: string): Observable<Like>{
    return this.http.post<Like>(this.baseUrl, postStringId, this.httpOptions)
  }

  getIfLiked(postStringId: string): Observable<Like> {
    let params = new HttpParams().set("postStringId", postStringId);
    return this.http.get<Like>(this.baseUrl + '/ifLiked', this.httpOptions);
  }
}
