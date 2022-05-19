import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IAlbumPhoto } from 'src/app/shared/album-photo.model';
import { AlbumPhotoService } from 'src/app/shared/album-photo.service';
import { IAlbum } from '../../models/album.model';
import { AlbumService } from '../../shared/album.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  albumName: string;
  albumId: string;
  albums: IAlbum[];
  username: string;
  photos: IAlbumPhoto[];

  constructor(private route: ActivatedRoute, private albumPhotoService: AlbumPhotoService) { }

  ngOnInit(): void {
    this.username = localStorage.getItem("Username") as string;
    let albumData = this.route.snapshot.paramMap.get("albumData") as string;
    this.getAlbumData(albumData);

    this.albumPhotoService.getPhotos(this.albumId).subscribe(response => {
      this.photos = response;
    });
  }

  getAlbumData(albumData: string){
    let array = albumData.split("_");
    this.albumName = array[0];
    this.albumId = array[1];
  }

  FileSelected(event: any){
    
    let selectedFile = <File>event.target.files[0];

    const formData = new FormData();

    formData.append("albumId", this.albumId);
    formData.append("albumName", this.albumName);
    formData.append("username", this.username);
    formData.append("photo", selectedFile);
    

    this.albumPhotoService.uploadPhoto(formData);

    window.location.reload();
  }
}
