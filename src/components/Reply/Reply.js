import { useContext, useState } from 'react';
import '../../assets/css/Comment.css'
import ButtonAction from '../shared/ButtonAction';
import ButtonVote from '../shared/ButtonVote';
import NewReply from '../new/NewReply';
import { commentData } from "../shared/CommentData";
import { Context } from '../../services/Memory';
import Button from '../shared/Button';

const Reply = ({id,content,createdAt,score,user,replies,replyingTo,parentId})=>{
    
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
        dispatch({type: 'updateComment', comment: form, parentId: id});
        setIsEditing(false);
    }
    // const updateReply = async (e) => {
    //     e.preventDefault();
    //     dispatch({type: 'updateReply', comment: form, parentId: id});
    //     setIsEditing(false);
    // }
    const onChange = (event, prop) => {
        event.preventDefault();
        id && setForm(state => ({ ...state,[prop]:event.target.value}));
    }

    // useEffect(() => {
    //     if(isEditing){
    //         parentId===undefined?
    //         setForm(state.objects[id]):
    //         setForm({content})
    //     }else{
    //         setForm(form)
    //     }

    // },[isEditing,id,state.objects,content,parentId]);

    return ( 
        <section className="main-container">
            <div className="reply-container">
                <div className="reply-separator"></div>
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
                            <form className='form-update' onSubmit={updateComment}>
                                <textarea 
                                className="new-comment-description"
                                // value={`${!replyingTo ?'': '@'+replyingTo+' '}${form.content}`}
                                value={form.content}
                                onChange={e => onChange(e,'content')}
                                >
                                </textarea>

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
                        <div className="reply-separator" style={{"marginLeft":"10px"}}></div>
                        <NewReply user={user.username} id={id}  replyingTo={replyingTo}
                            handleReply={replyingTo && "new-reply-form"}
                            handleChange={e => onChange(e,'content')}
                            valueText={form.content}
                        />
                        </>
                        ):
                    null
                    }
                    
            </div>
            {replies&&replies.map(reply => 
            
            <Reply key={reply.id} id={reply.id} {...reply} parentId={id} />
        
        )}
        </section>
    );
}

export default Reply