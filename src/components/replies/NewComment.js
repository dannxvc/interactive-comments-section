import { useContext, useEffect, useState } from 'react';
import '../../assets/css/Comment.css';
import '../../assets/css/New.css';
import {default as ReplyMe} from '../../assets/img/avatars/image-juliusomo.png';
import { Context } from '../services/Memory';
import Button from '../shared/Button';

function NewComment() {
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
    const [state, dispatch] = useContext(Context);

    const {content,createdAt,score,user,replies} = form;

    const onChange = (event, prop) => {
        event.preventDefault();
        setForm(comment => ({ ...comment,[prop]:event.target.value}));
    }
    useEffect(() => {
    },[form]);

    const createComment = async (e) => {
        e.preventDefault();
        dispatch({type: 'createComment', comment: form});
    }

    return ( 
        <form className="container new-comment-container" onSubmit={createComment}>
            <div className="new-comment-pic">
                <img src={user.image} className="nc-img-author" alt="Author icon"></img>
            </div>
            <textarea 
                className="new-comment-description" 
                placeholder="Add a comment..." 
                value={content}
                onChange={e => onChange(e,'content')}
                required
            >            
            </textarea>
            <Button
               className="btn-reply"
            >SEND</Button>
        </form>
     );
}

export default NewComment;