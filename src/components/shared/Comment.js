import { useState } from 'react';
import '../../assets/css/Comment.css';
import Button from './Button';
import ButtonAction from './ButtonAction';
import ButtonVote from './ButtonVote';
import { commentData } from "./CommentData";


function Comment({id,content,createdAt,score,user,replyingTo}) {
    
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
                                {user.username==="juliusomo" && <div className="tag-author">you</div>}
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
                            {replyingTo && <span className="user-replying-to">@{replyingTo}</span>} 
                            {content}
                        </p>
                    </div> 
                </div>
            </div>
                {replyingTo &&<div className="reply-separator"></div>}
                <form className={`container new-comment-container ${replyingTo && "new-reply-form"} ${isVisible==="visible"? "":"new-comment-invisible"}`}>
                    <div className="new-comment-pic">
                        <img src={currentUserInfo.image} className="nc-img-author" alt="Author icon"></img>
                    </div>
                    <textarea 
                        className="new-comment-description" 
                        placeholder="Add a comment..." 
                        value={`@${user.username},`}
                    >  
                    <span className="user-replying-to">@ </span>
                    </textarea>
                    <Button
                    className="btn-reply"
                    >REPLY</Button>
                </form>
            </div>
     );
}

export default Comment;