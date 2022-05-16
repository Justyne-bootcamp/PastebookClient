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

  // postForm: FormGroup = new FormGroup({
  //   textContent: new FormControl(''),
  //   photo: new FormControl('')
  // });

  selectedFile: File | null;
  post: Post = {
    textContent:'',
    postLocation:'00000000-0000-0000-0000-000000000000',
  }
  
  constructor(public service: PostService) { }

  ngOnInit(): void {
  }

  // chooseFile(files: File) {
  //   // ...
  //   this.post.photo = files[0];
  // }
  onFileSelected(event:any){
    this.selectedFile=<File>event.target.files[0];
  }
  
  onSubmit() {
    const formData = new FormData();
    // for (const key of Object.keys(this.postForm.value)) {
    //   const value = this.postForm.value[key];
    //   formData.append(key, value);
    // }
    if(this.selectedFile != null){
      formData.append('photo',this.selectedFile);
    }
    formData.append('textContent', this.post.textContent);
    formData.append('postLocation', this.post.postLocation);
    this.service.newPost(formData)
    .subscribe(
      response => {
        console.log(response);
      }
    )
    
    // console.log(formData);
  }

}
