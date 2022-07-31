import { useEffect, useState } from 'react';
import '../../assets/css/Comment.css';
import '../../assets/css/New.css';
import {default as ReplyMe} from '../../assets/img/avatars/image-juliusomo.png';
import Button from '../shared/Button';

function NewComment() {
    const [form, setForm] = useState(
        {
            // "id": 1,
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
    const {content,createdAt,score,user,replies} = form;

    const onChange = (event, prop) => {
        setForm(comment => ({ ...comment,[prop]:event.target.value}));
    }

    useEffect(() => {
    },[form]);

    const createComment = async () => {
        console.log(form);
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
                onChange={e => onChange(e,'content')}>            
            </textarea>
            <Button>SEND</Button>
        </form>
     );
}

export default NewComment;