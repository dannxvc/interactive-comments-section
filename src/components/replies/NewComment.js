import '../../assets/css/Comment.css';
import '../../assets/css/New.css';
import {default as ReplyMe} from '../../assets/img/avatars/image-juliusomo.png';
import Button from '../shared/Button';

function NewComment() {
    return ( 
        <form className="container new-comment-container">
            <div className="new-comment-pic">
                <img src={ReplyMe} className="nc-img-author" alt="Author icon"></img>
            </div>
            <textarea className="new-comment-description" placeholder="Add a comment...">
                {/* <p>Great work! I haven't got much to add beyond what's already been said, but i just wanted to say congrats! Your're done an excellent job on this!</p> */}
            </textarea>
            <Button>SEND</Button>
        </form>
     );
}

export default NewComment;