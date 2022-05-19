import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumComponent } from './album/album.component';
import { FriendsComponent } from './friends/friends.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegistrationComponent } from './registration/registration.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { SettingComponent } from './setting/setting.component';
import { TimelineComponent } from './timeline/timeline.component';
import { GalleryComponent } from './album/gallery/gallery.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'pastebook.com/:username', component: ProfileComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'login', component: LoginComponent},
  {path: 'album/:username', component: AlbumComponent},
  {path: 'timeline', component: TimelineComponent},
  {path: 'friends', component: FriendsComponent},
  {path: 'search/:searchName', component: SearchResultComponent},
  {path: 'setting', component: SettingComponent},
  {path: 'album/:username/:albumName/gallery', component: GalleryComponent},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
