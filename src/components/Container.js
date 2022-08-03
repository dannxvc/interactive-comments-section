import { useContext } from 'react';
import '../assets/css/Comment.css';
import { Context } from './services/Memory';
import Comment from "./shared/Comment";

function Container({id,content,createdAt,score,user,replies}) {
    const [state, dispatch] = useContext(Context);
    return ( 
        
        <section className="main-container">
            <Comment
                score={score}
                user={user}
                id={id}
                content={content}
                createdAt={createdAt}
                replies={replies}
            />
          
            {replies.map(reply => <Comment key={reply.id} {...reply}>
         
            </Comment>)}
        </section>
     );
}

export default Container;