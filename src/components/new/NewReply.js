import '../../assets/css/Comment.css';
import '../../assets/css/New.css';
import { commentData } from "../shared/CommentData";
import Button from '../shared/Button';
import { useContext, useState } from 'react';
import { Context } from '../../services/Memory'

function NewReply({handleReply, setIsReplying, id, replyingTo,classReply}) {

        // **** calculate the new id *****
        //initialize a new array that will contain all the ids
        const arrayIds = []

        // to iterate over the comments array from commentData.js
        const extractAllIds = (comments)=>{
            
            // iterate over each comment with map()
            comments.map((comment)=>{

                // add the id value into the arrayIds and iterate over the next element (comment)
                arrayIds.push(comment.id)
                
                // if the comment has a replies property (an array with objects)
                if(comment.replies){

                    // every time this is true, extractAllIds() works as a recursive function with the founded array (replies)
                    return extractAllIds(comment.replies)
                }
            })
            return arrayIds
        }

        // execute it at the first render of the component (not the parent component)
        extractAllIds(commentData.comments)
        
        // to find the max value of arrayIds (avoid using a random id number)
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
            >SEND</Button>
        </form>
     );
}

export default NewReply;