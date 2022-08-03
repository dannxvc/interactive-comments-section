import {default as ReplyMe} from '../../assets/img/avatars/image-juliusomo.png';
import '../../assets/css/Comment.css';
import { useContext, useEffect, useState } from 'react';
import '../../assets/css/New.css';
import Button from '../shared/Button';

function NewReply() {
    const [form, setForm] = useState(
        {
            "content": "",
            "createdAt": "now",
            "score": 0,
            "user": {
              "image": ReplyMe,
              "username": "juliusomo"
            },
            "replies": []
        },
    );
    const [state, dispatch] = useContext(ReplyContext);
    return ( 
        <form className="container new-comment-container" onSubmit={createComment}>
            <div className="new-comment-pic">
                <img src={user.image} className="nc-img-author" alt="Author icon"></img>
            </div>
            <textarea 
                className="new-comment-description" 
                placeholder="Add a comment..." 
                value={content}
                onChange={e => onChange(e,'content')}>            
            </textarea>
            <Button
               className="btn-reply"
            >SEND</Button>
        </form>
     );
}

export default NewReply;