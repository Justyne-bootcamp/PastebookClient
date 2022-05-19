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

  postLike(form: FormData): Observable<Like>{
    return this.http.post<Like>(this.baseUrl, form)
  }
}
