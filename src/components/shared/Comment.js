import { useState } from 'react';
import '../../assets/css/Comment.css';
import ButtonAction from './ButtonAction';
import ButtonVote from './ButtonVote';
import NewComment from '../shared/NewComment';
import { commentData } from "./CommentData";


function Comment({id,content,createdAt,score,user,replies,replyingTo,parentId}) {
    const currentUserInfo = commentData.currentUser;
    const [isVisible,setVisible]= useState("notVisible");
    return ( 
        <section className="main-container">
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
                        // handleChange={e => onChange(e,'content')}
                        // handleSubmit={createReply}
                        // valueText={form.content}
                    />
            </div>
            {replies.map(reply => <Comment key={reply.id} {...reply} parentId={id}>
         
         </Comment>)}
        </section>
     );
}

export default Comment;