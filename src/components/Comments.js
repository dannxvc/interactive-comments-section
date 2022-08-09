import Comment from "./shared/Comment";
import '../assets/css/Main.css';
import { Context } from '../services/Memory';
import NewComment from "./new/NewComment";
import { useContext, useEffect, useState } from 'react';
import { commentData } from "./shared/CommentData";

function Main() {
    const [state] = useContext(Context);

    const currentUserInfo = commentData.currentUser;

    const [form, setForm] = useState(
        {
            "content": "",
            "createdAt": "Now",
            "score": 0,
            "user": {
              "image": currentUserInfo.image,
              "username": currentUserInfo.username
            },
            "replies": []
        },
    );
    const [, dispatch] = useContext(Context);

    const {content} = form;

    const onChange = (event, prop) => {
        event.preventDefault();
        setForm(comment => ({ ...comment,[prop]:event.target.value}));

    }
    useEffect(() => {
    },[form]);

    const createComment = async (e) => {
        e.preventDefault();
        dispatch({type: 'createComment', comment: form});
        setForm(comment => ({ ...comment,[content]:""}));
    }
    
    return ( 
        <main>
            {state.order.map(id => <Comment key={id} {...state.objects[id]}></Comment>)}
            <NewComment
                handleSubmit={createComment}
                valueText={content}
                handleChange={e => onChange(e,'content')}
            />
        </main>
     );
}

export default Main;