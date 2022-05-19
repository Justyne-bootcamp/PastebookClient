import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAlbumPhoto } from './album-photo.model';

@Injectable({
  providedIn: 'root'
})
export class AlbumPhotoService {

  readonly baseUrl: string = "https://localhost:44364/api/AlbumPhoto/";
  constructor(private http: HttpClient) { }

  uploadPhoto(formData: FormData){
    this.http.post(this.baseUrl+"upload", formData).subscribe(response => {
      console.log(response);
    });
  }

  getPhotos(albumId: string): Observable<IAlbumPhoto[]>{
    return this.http.get<IAlbumPhoto[]>(this.baseUrl+"getphoto/"+albumId);
  }
}
