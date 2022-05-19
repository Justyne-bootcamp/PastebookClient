import { Component, OnInit } from '@angular/core';
import { IAlbum } from '../../models/album.model';
import { AlbumService } from '../../shared/album.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  albumName: string;
  albums: IAlbum[];
  username: string;

  constructor(private albumService: AlbumService) { }

  ngOnInit(): void {
  //   this.albumService.getAlbums().subscribe(response => {
  //     this.albums = response;
  //   });
  //   this.albumName = localStorage.getItem("AlbumName") as string;
  //   console.log(this.albumName);
  // }
  }
}
