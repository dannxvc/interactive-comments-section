import { useContext, useEffect, useState } from 'react';
import '../../assets/css/Comment.css';
import ButtonAction from './ButtonAction';
import ButtonVote from './ButtonVote';
import NewComment from '../shared/NewComment';
import { commentData } from "./CommentData";
import { Context } from '../../services/Memory';
import Button from './Button';


function Comment({id,content,createdAt,score,user,replies,replyingTo,parentId}) {
    const currentUserInfo = commentData.currentUser;
    const [isReplying,setIsReplying]= useState(false);
    const [isEditing,setIsEditing]= useState(false);
    const [form, setForm] = useState(
        {
            "content": "",
            "createdAt": "Now",
            "score": 0,
            "replyingTo": "",
            "user": {
              "image": currentUserInfo.image,
              "username": currentUserInfo.username
            },
            "replies": []
        },
    );
    const [state, dispatch] = useContext(Context);

    const createReply = async (e) => {
        e.preventDefault();
        dispatch({type: 'createReply', parentId: parentId});
    }
    const updateComment = async (e) => {
        e.preventDefault();
        dispatch({type: 'updateComment', comment: form});
        setIsEditing(false);
    }
    const onChange = (event, prop) => {
        event.preventDefault();
        id &&  setForm(state => ({ ...state,[prop]:event.target.value}));
    }
    useEffect(() => {
        isEditing? setForm(state.objects[id]):setForm(form);
    },[isEditing,id,state.objects]);

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
                                onClickReply={()=> isReplying === false?setIsReplying(true): setIsReplying(false)}
                                onClickEdit={()=> isEditing === false?setIsEditing(true): setIsEditing(false)}
                            />
                        </div>  
                        {isEditing ? ( 
                            <form className='form-update' onSubmit={updateComment}>
                                <textarea 
                                className="new-comment-description"
                                value={`${!replyingTo ?'': '@'+replyingTo+' '}${form.content}`}
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
                                    {replyingTo && <span className="user-replying-to">@{replyingTo} {parentId} </span>} 
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
                        {replyingTo &&<div className="reply-separator"></div>}
                        <NewComment
                        handleReply={replyingTo && "new-reply-form"}
                        handleChange={e => onChange(e,'content')}
                        handleSubmit={createReply}
                        valueText={form.content}
                        />
                     </>
                     ):
                    (<></>)
                    }
                   
            </div>
            {replies.map(reply => <Comment key={reply.id} {...reply} parentId={id}>
         
         </Comment>)}
        </section>
     );
}

export default Comment;