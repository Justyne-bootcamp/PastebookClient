import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAlbum } from '../models/album.model';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  readonly baseUrl: string = "https://localhost:44364/api/Album/";
  constructor(private http: HttpClient) { }

  createAlbum(userAccountId: string, albumName: string){
    this.http.post(this.baseUrl+"insert", {userAccountId: userAccountId, albumName: albumName}).subscribe(response => {
      console.log(response);
    });
  }
  getAlbums(userAccountId: string): Observable<IAlbum[]>{
    return this.http.get<IAlbum[]>(this.baseUrl+"myalbum/"+userAccountId);
  }

  deleteAlbum(albumId: string){
    this.http.delete(this.baseUrl+"delete/"+albumId).subscribe(response => {
      console.log(response);
    });
  }
}
