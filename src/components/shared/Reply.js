import { useContext, useEffect, useState } from 'react';
import '../../assets/css/Comment.css'
import ButtonAction from './ButtonAction';
import ButtonVote from './ButtonVote';
import NewReply from '../new/NewReply';
import { commentData } from "./CommentData";
import { Context } from '../../services/Memory';
import Button from '../shared/Button';
import { useRef } from "react";
import { useInView } from "framer-motion";



function Reply ({id,content,createdAt,score,user,replies,replyingTo,parentId,rootid,repliesRoot}){
    
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
    
    
    const  updateReply= (e) => {
        e.preventDefault();
        dispatch({type: 'updateReply', reply: form, parentId: parentId, rootid:rootid});
        setIsEditing(false);
    }
    const onChange = (event, prop) => {
        event.preventDefault();
        setForm(reply => ({ ...reply,[prop]:event.target.value}));
    }
    useEffect(() => {
        if(isEditing){
            const findInsideReplies = (repliesArray, parentID)=>{                
                repliesArray.map((reply)=>{    
                    if(reply.id === parentId){
                        let replyActualObject = reply.replies[reply.replies.findIndex(reply =>reply.id===id)];
                        setForm(replyActualObject);
                     } 
                    if(reply.replies.length > 0){
                        return findInsideReplies(reply.replies, parentID);
                    }
                });
            }
            const findParent = (replies)=>{
                for(let key in replies){
                    if(replies[key].id === rootid){
                        let replyActualObject = replies[key].replies[replies[key].replies.findIndex(reply =>reply.id===id)];
                        setForm(replyActualObject);
                    }
                    findInsideReplies(state.objects[key].replies, rootid)
                }
            }
            findParent(state.objects);
        }else{
            setForm(form)
        }

    },[isEditing,id,state.objects, parentId, rootid]);
    
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return ( 
        <section className="main-container">
            <div 
                className={`${rootid===parentId?"reply-container":"reply-to-reply"}`}
                ref={ref}
                style={{
                    transform: isInView ? "none" : "translateY(100px)",
                    opacity: isInView ? 1 : 0,
                    transition: "all 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) 0.1s"
                }}
            >
                <h2 className='title-screen-readers-only'>Reply by {user.username}</h2>
                {rootid===parentId?
                    <div className="reply-separator"></div>:
                    <>
                    <div className="reply-separator"></div>
                    <div className="reply-separator"></div>
                    </>
                }
                <div className="container">
                <ButtonVote score={score} />
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
                                onClickReply={()=> isReplying === false?setIsReplying(true): setIsReplying(false)}
                                onClickEdit={()=> isEditing === false?setIsEditing(true): setIsEditing(false)}
                                parentId={parentId}
                                rootid={rootid}
                            />
                        </div>  
                        {isEditing ? ( 
                            <form className='form-update' onSubmit={updateReply}>
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
                                    <span className="user-replying-to">
                                        @{replyingTo} 
                                    </span> {content}
                                </p>
                            </div> 
                            )
                        }
                        
                    </div>
                </div>
                    {isReplying ? 
                        (
                         <>
                         {rootid===parentId?
                            <div className="reply-separator"></div>:
                            <>
                            <div className="reply-separator"></div>
                            <div className="reply-separator"></div>
                            </>
                            }
                        <NewReply 
                            user={user.username} 
                            id={id}  
                            replyingTo={user.username}
                            handleReply={replyingTo && "new-reply-form"}
                            handleChange={e => onChange(e,'content')}
                            valueText={form.content}
                            setIsReplying={setIsReplying}
                            classReply={rootid===parentId?"":"new-reply-form-to-reply"}
                        />
                        </>
                        ):
                    null
                    }
                    
            </div>
            {replies&&replies.map(reply => 
            
            <Reply 
                key={reply.id} 
                id={reply.id} 
                {...reply} 
                parentId={id} 
                rootid={rootid} 
                repliesRoot={repliesRoot}
            />
        
        )}
        </section>
    );
}

export default Reply;