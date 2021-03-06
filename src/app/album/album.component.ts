import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IAlbum } from '../shared/album.model';
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
  userAccountId: string;
  albumOwnersUsername: string;
  constructor(private albumService: AlbumService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.username = localStorage.getItem("Username") as string;
    this.userAccountId = localStorage.getItem("UserAccountId") as string;
    this.albumOwnersUsername = this.route.snapshot.paramMap.get("username") as string;
    this.albumService.getAlbums(this.albumOwnersUsername).subscribe(response => {
      this.albums = response;
    });
    console.log(this.username);
  }

  showModalFunction(value: boolean){
    this.showModal = value;
    
  }
  createAlbum(){
    this.albumService.createAlbum(this.userAccountId, this.albumName);
    this.showModal = false;
    window.location.reload();
  }
  deleteAlbum(albumId: string){
    this.albumService.deleteAlbum(albumId);
    window.location.reload();
  }
  openAlbum(albumId: string, albumName: string){
    alert(albumId + " " + albumName)
  }
  uploadPhoto(albumName: string){
    alert(albumName);
  }

}
