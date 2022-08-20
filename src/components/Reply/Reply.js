import { useContext, useEffect, useState } from 'react';
import '../../assets/css/Comment.css'
import ButtonAction from '../shared/ButtonAction';
import ButtonVote from '../shared/ButtonVote';
import NewReply from '../new/NewReply';
import { commentData } from "../shared/CommentData";
import { Context } from '../../services/Memory';
import Button from '../shared/Button';

const Reply = ({id,content,createdAt,score,user,replies,replyingTo,parentId,rootid,repliesRoot})=>{
    
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
    
    
    const  updateReply= async (e) => {
        e.preventDefault();
        dispatch({type: 'updateReply', reply: form, parentId: parentId});
        setIsEditing(false);
    }
    // const updateReply = async (e) => {
    //     e.preventDefault();
    //     dispatch({type: 'updateReply', comment: form, parentId: id});
    //     setIsEditing(false);
    // }
    const onChange = (event, prop) => {
        event.preventDefault();
        setForm({...form, content: event.target.value})
    }

    useEffect(() => {
        if(isEditing){
            rootid==parentId?
            setForm(repliesRoot[repliesRoot.findIndex(reply =>{
                if(reply.id===id){return true}
            })]):
            //repliesRoot=state.objects[rootid].replies
            // console.log(repliesRoot[0].replies[0]);
           setForm(
            repliesRoot[repliesRoot.findIndex(reply =>{
                if(reply.id===parentId){return true}
            })].replies[
                repliesRoot[
                    repliesRoot.findIndex(reply =>{
                    if(reply.id===parentId){return true}
                })
                ].replies.findIndex(reply =>{
                    if(reply.id===id){return true}
                })
            ])
        }else{

            setForm(form)
        }

            //  console.log( setForm(state.objects[parentId].replies[state.objects[parentId].replies.findIndex(reply =>{
            // //     if(reply.id===id){return true}
            // // })]))
            // console.log(findParent)

    },[isEditing]);

    return ( 
        <section className="main-container">
            <div className={`${rootid===parentId?"reply-container":"reply-to-reply"}`}>
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
                                parentReplies={replies}
                                onClickReply={()=> isReplying === false?setIsReplying(true): setIsReplying(false)}
                                onClickEdit={()=> isEditing === false?setIsEditing(true): setIsEditing(false)}
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
                                    <span className="user-replying-to">@{replyingTo} </span>
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
                         {rootid===parentId?
                            <div className="reply-separator"></div>:
                            <>
                            <div className="reply-separator"></div>
                            <div className="reply-separator"></div>
                            </>
                            }
                        <NewReply user={user.username} id={id}  replyingTo={user.username}
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
            
            <Reply key={reply.id} id={reply.id} {...reply} parentId={id} rootid={rootid} repliesRoot={repliesRoot}/>
        
        )}
        </section>
    );
}

export default Reply