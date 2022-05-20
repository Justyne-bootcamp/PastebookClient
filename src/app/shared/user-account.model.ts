export interface UserAccount {
    userAccountId: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    birthday: string;
    gender: string;
    mobileNumber: string;
    sessionId: string;
    aboutMe: string;
    profilePhotoPath: string;
    username: string;
}

export class UserAccount {
    public constructor(init?: Partial<UserAccount>) {
          Object.assign(this, init);
      }
  }
