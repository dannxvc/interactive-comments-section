import '../../assets/css/Comment.css';
import '../../assets/css/New.css';
import { commentData } from "../shared/CommentData";
import Button from '../shared/Button';
import { useContext, useState } from 'react';
import { Context } from '../../services/Memory'

function NewReply({handleReply, setIsReplying, id, replyingTo,classReply}) {
        const arrayIds = []
        const extractAllIds = (comments)=>{
            comments.map((comment)=>{
                arrayIds.push(comment.id)
                if(comment.replies){
                    return extractAllIds(comment.replies)
                }
            })
            return arrayIds
        }
        extractAllIds(commentData.comments)
        const maxValueId = arrayIds.reduce((previous, current)=>{
                return (previous < current) ? current: previous;
        })

        const currentUserInfo = commentData.currentUser;

        const [form, setForm] = useState(
            {
                "content": "",
                "createdAt": "Now",
                "score": 0,
                "replyingTo": replyingTo,
                "user": {
                    "image": currentUserInfo.image,
                    "username": currentUserInfo.username
                },
                "replies": []
            }
        );
           
        const [, dispatch] = useContext(Context);
            

        const handleChange = (event) => {
            event.preventDefault();
            setForm({...form, content: event.target.value});
        }               
            
        const createReply = async (e) => {
            e.preventDefault();
            dispatch({type: 'createReply', comment:form,commentId:id, maxValueId:maxValueId + 1}); 
            setIsReplying(false);
        }

    return ( 
        <form className={`container new-comment-container ${handleReply} ${classReply}`}
        onSubmit={createReply}
        
        >
            <div className="new-comment-pic">
                <img src={currentUserInfo.image} className="nc-img-author" alt="Author icon"></img>
            </div>
            <textarea 
                className="new-comment-description" 
                placeholder="Add a comment..." 
                
                onChange={handleChange}
                required
            >            
            </textarea>
            <Button
               className="btn-reply"
            >REPLY</Button>
        </form>
     );
}

export default NewReply;