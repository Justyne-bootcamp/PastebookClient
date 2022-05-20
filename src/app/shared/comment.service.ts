import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentForm } from './comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  baseUrl = 'https://localhost:44364/api/Comment'
  constructor(private http:HttpClient) { }

  newComment(form:FormData): Observable<CommentForm>{
    return this.http.post<CommentForm>(this.baseUrl, form)
  }
}
