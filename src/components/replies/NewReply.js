import '../../assets/css/Comment.css';
import '../../assets/css/NewReply.css';
import {default as ReplyMe} from '../../assets/img/avatars/image-juliusomo.png';
import Button from '../shared/Button';

function NewReply() {
    return ( 
        <div className="container new-reply-container">
            <div className="new-reply-pic">
                <img src={ReplyMe} className="nr-img-author" alt="Author icon"></img>
            </div>
            <textarea className="new-reply-description" placeholder="Add a comment...">
                {/* <p>Great work! I haven't got much to add beyond what's already been said, but i just wanted to say congrats! Your're done an excellent job on this!</p> */}
            </textarea>
            <Button>SEND</Button>
        </div>
     );
}

export default NewReply;