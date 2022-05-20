export interface Session {
    userAccountId:string;
    username:string;
}

export interface SettingChangeConfirmation {
    sessionId: string;
    password: string;
}
