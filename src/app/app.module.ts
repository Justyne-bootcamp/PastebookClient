import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { FriendsComponent } from './friends/friends.component';
import { TimelineComponent } from './timeline/timeline.component';
import { AlbumComponent } from './album/album.component';
import { HttpClientModule } from '@angular/common/http';
import { PostFormComponent } from './home/post-form/post-form.component';
import { UserAccountService } from './user-account.service';
import { NewsFeedComponent } from './home/news-feed/news-feed.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { TimelineFeedComponent } from './profile/timeline-feed/timeline-feed.component';
import { SettingComponent } from './setting/setting.component';
import { GalleryComponent } from './album/gallery/gallery.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    NavbarComponent,
    HomeComponent,
    ProfileComponent,
    FriendsComponent,
    TimelineComponent,
    AlbumComponent,
    PostFormComponent,
    NewsFeedComponent,
    SearchResultComponent,
    TimelineFeedComponent,
    SettingComponent,
    GalleryComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [HttpClientModule, UserAccountService],
  bootstrap: [AppComponent]
})
export class AppModule { }
