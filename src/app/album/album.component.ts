import { Component, OnInit } from '@angular/core';
import { IAlbum } from '../models/album.model';
import { AlbumService } from '../shared/album.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  showModal: boolean = false;
  albumName: string;
  albums: IAlbum[];
  username: string;
  constructor(private albumService: AlbumService) { }

  ngOnInit(): void {
    this.albumService.getAlbums().subscribe(response => {
      this.albums = response;
    });
    this.username = localStorage.getItem("Username") as string;
    console.log(this.username);
  }

  showModalFunction(value: boolean){
    this.showModal = value;
  }
  createAlbum(){
    this.albumService.createAlbum(this.albumName);
    this.showModal = false;
    window.location.reload();
  }
  deleteAlbum(albumId: string){
    alert(albumId);
    this.albumService.deleteAlbum(albumId);
  }
  openAlbum(albumId: string, albumName: string){
    alert(albumId + " " + albumName)
  }
  uploadPhoto(albumName: string){
    alert(albumName);
  }

}
