export interface Post {
    textContent: string;
    postLocation: string;
    photo?: File | null;
}

export interface PostFeed {
    postId: string;
    textContent: string;
    postLocation: string;
    timeStamp: string;
    firstName: string;
    lastName: string;
    username: string;
    postPhotoPath: string;
    profilePhotoPath: string;
}

export class PostFeed {
    public constructor(init?: Partial<PostFeed>) {
          Object.assign(this, init);
      }
  }
