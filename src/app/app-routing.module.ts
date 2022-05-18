import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumComponent } from './album/album.component';
import { FriendsComponent } from './friends/friends.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegistrationComponent } from './registration/registration.component';
import { TimelineComponent } from './timeline/timeline.component';
import { GalleryComponent } from './album/gallery/gallery.component';

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'pastebook.com/:username', component: ProfileComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'login', component: LoginComponent},
  {path: 'album', component: AlbumComponent},
  {path: 'timeline', component: TimelineComponent},
  {path: 'friends', component: FriendsComponent},
  {path: 'album/gallery', component: GalleryComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
