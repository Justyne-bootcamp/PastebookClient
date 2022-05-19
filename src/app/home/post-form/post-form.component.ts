import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Post } from 'src/app/shared/post.model';
import { PostService } from 'src/app/shared/post.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {

  selectedFile: File | null;
  sessionId: string;
  post: Post = {
    textContent:'',
    postLocation:'00000000-0000-0000-0000-000000000000',
  }
  
  constructor(public service: PostService) { }

  ngOnInit(): void {
    this.sessionId = localStorage.getItem("UserAccountId") as string;
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
    this.service.newPostToNewsFeed(this.sessionId, formData)
    .subscribe(
      response => {
        console.log(response);
      }
    )
  }

}
