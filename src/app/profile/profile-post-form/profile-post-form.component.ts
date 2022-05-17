import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Post } from 'src/app/shared/post.model';
import { PostService } from 'src/app/shared/post.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-post-form',
  templateUrl: './profile-post-form.component.html',
  styleUrls: ['./profile-post-form.component.css']
})
export class ProfilePostFormComponent implements OnInit {
  selectedFile: File | null;
  username: string;
  post: Post = {
    textContent:'',
    postLocation:'00000000-0000-0000-0000-000000000000',
  }
  
  constructor(private route: ActivatedRoute, public service: PostService) { }

  ngOnInit(): void {
    this.route.params.subscribe( params =>
      this.username = params['username'])
  }

  onFileSelected(event:any){
    this.selectedFile=<File>event.target.files[0];
  }
  
  onSubmit() {
    const formData = new FormData();
    if(this.selectedFile != null){
      formData.append('photo',this.selectedFile);
    }
    formData.append('textContent', this.post.textContent);
    formData.append('postLocation', this.post.postLocation);
    this.service.newPostToProfile(this.username, formData)
    .subscribe(
      response => {
        console.log(response);
      }
    )
  }
}
