import { useContext, useEffect, useState } from 'react';
import '../../assets/css/Comment.css';
import ButtonAction from './ButtonAction';
import ButtonVote from './ButtonVote';
import NewReply from '../new/NewReply';
import { commentData } from "./CommentData";
import { Context } from '../../services/Memory';
import Button from './Button';
import Reply from './Reply';
import { useRef } from "react";
import { useInView } from "framer-motion";



function Comment({id,content,createdAt,score,user,replies,replyingTo}) {
    const currentUserInfo = commentData.currentUser;
    const [isReplying,setIsReplying]= useState(false);
    const [isEditing,setIsEditing]= useState(false);
    const [form, setForm] = useState(
        {
            "content": "",
            "createdAt": "Now",
            "score": 0,
            "replyingTo": user.username,
            "user": {
              "image": currentUserInfo.image,
              "username": currentUserInfo.username
            },
            "replies": []
        }
    );
    const [state, dispatch] = useContext(Context);


    const  updateComment= async (e) => {
        e.preventDefault();
        dispatch({type: 'updateComment', comment: form});
        setIsEditing(false);
    }
    const onChange = (event, prop) => {
        event.preventDefault();
        setForm(state => ({ ...state,[prop]:event.target.value}));
    }

    useEffect(() => {
        isEditing?
            setForm(state.objects[id])
            :
            setForm(form)

    },[isEditing]);
    
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    return ( 
        <section 
            className="main-container"
            ref={ref}
            style={{
                transform: isInView ? "none" : "translateY(100px)",
                opacity: isInView ? 1 : 0,
                transition: "all 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) 0.1s"
            }}
        >
            <h2 className='title-screen-readers-only'>Comment by {user.username}</h2>
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
                                parentReplies={replies}
                                onClickReply={()=> isReplying === false?setIsReplying(true): setIsReplying(false)}
                                onClickEdit={()=> isEditing === false?setIsEditing(true): setIsEditing(false)}
                            />
                        </div>  
                        {isEditing ? ( 
                            <form className='form-update' onSubmit={updateComment}>
                                <textarea 
                                className="new-comment-description"
                                value={form.content}
                                onChange={e => onChange(e,'content')}
                                >
                                </textarea>
                                <Button
                                className="btn-update"
                                >
                                    UPDATE
                                </Button>
                            </form> 
                            )
                           : (
                            <div className="comment-description">
                                <p>
                                    {replyingTo && <span className="user-replying-to">@{replyingTo} </span>} 
                                    {content}
                                </p>
                            </div> 
                            )
                        }
                        
                    </div>
                </div>
                    {isReplying ? 
                    (
                        <>
                            {replyingTo &&
                                <div className="reply-separator">
                                
                                </div>
                            }
                            <NewReply 
                                user={user.username} 
                                id={id} 
                                replyingTo={user.username}
                                handleReply={replyingTo && "new-reply-form"}
                                handleChange={e => onChange(e,'content')}
                                valueText={form.content}
                                setIsReplying={setIsReplying}
                            />
                        </>
                    )
                    :
                    (
                        <></>
                    )
                    }
                   
            </div>
            {replies&&replies.map(reply => 
            
                <Reply 
                    key={reply.id} 
                    id={reply.id} {...reply} 
                    parentId={id} 
                    rootid={id} 
                    repliesRoot={replies}
                />
            
            )}
        </section>
     );
}

export default Comment;