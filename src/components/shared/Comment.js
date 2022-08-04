import {  useState } from 'react';
import '../../assets/css/Comment.css';
import ButtonAction from './ButtonAction';
import ButtonVote from './ButtonVote';
import NewComment from '../shared/NewComment';
import { commentData } from "./CommentData";


function Comment({id,content,createdAt,score,user,replyingTo,parentId}) {
    // const idReply= String(Math.random());
    
    // const initialState = {
    //     "contentReply": "@" + user.username + " ",
    //     "createdAt": "now",
    //     "score": 0,
    //     "user": {
    //         "image": ReplyMe,
    //         "username": "juliusomo"
    //     },
    //     "replies": []
    // };

    // const initialReplyState = {
    //     order:[],
    //     objects:{}
    // }
    // function ReplyReductor(state, action){
    //     switch (action.type) {
    //         case 'createReply': {
    //             // const id = action.comment.id;
    //             const id= action.id;
    //             const newState = {
    //                 order:[...state.order, id],
    //                 objects:{
    //                     ...state.replies.objects,
    //                     [id]: {id, ...action.comment}
    //                 }
    //         };
    //         console.log(newState);
    //         return newState;
    //     };
    //         default:
    //           throw new Error();
    //     }
    // }
    // const handleSubmit=()=> addReply(content, id);

    const currentUserInfo = commentData.currentUser;
  
    const [isVisible,setVisible]= useState("notVisible");

    return ( 
        <div className={replyingTo && `reply-container`}>
             {replyingTo &&<div className="reply-separator"></div>}
            <div className="container">
                <ButtonVote
                    score={score}
                />
                <div className="comment">
                    <div className="comment-author">
                        <div className="author-details">
                            <img src={user.image} className="img-author" alt="Author icon"></img>
                            <div className="author-username">
                                <p className="name-author">{user.username}</p>
                                {user.username===currentUserInfo.username && <div className="tag-author">you</div>}
                            </div>
                                <span className="comment-age">{createdAt}</span>
                        </div>
                        <ButtonAction
                            id={id}
                            user={user}
                            onClickReply={()=> isVisible === "notVisible"?setVisible("visible"): setVisible("notVisible")}
                        />
                    </div>  
                    <div className="comment-description">
                        <p>
                            {replyingTo && <span className="user-replying-to">@{replyingTo} {parentId} </span>} 
                            {content}
                        </p>
                    </div> 
                </div>
            </div>
                {replyingTo &&<div className="reply-separator"></div>}
                <NewComment
                    handleVisible={isVisible==="visible"? "":"new-comment-invisible"}
                    handleReply={replyingTo && "new-reply-form"}
                />
            </div>
     );
}

export default Comment;