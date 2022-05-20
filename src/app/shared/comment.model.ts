export interface CommentForm {
    commentContent:string;
}

export interface CommentFeed {
    commentId:string;
    postId:string;
    userAccountId:string;
    firstName:string;
    lastName:string;
    commentContent:string;
}
