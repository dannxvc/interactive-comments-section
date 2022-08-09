import '../../assets/css/Comment.css';
import '../../assets/css/New.css';
import { commentData } from "../shared/CommentData";
import Button from '../shared/Button';

function NewReply({handleSubmit, handleReply,valueText,handleChange}) {

    const currentUserInfo = commentData.currentUser;
    return ( 
        <form className={`container new-comment-container ${handleReply}`}
        onSubmit={handleSubmit}
        
        >
            <div className="new-comment-pic">
                <img src={currentUserInfo.image} className="nc-img-author" alt="Author icon"></img>
            </div>
            <textarea 
                className="new-comment-description" 
                placeholder="Add a comment..." 
                value={valueText}
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