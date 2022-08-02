import '../assets/css/Comment.css';
import Comment from "./shared/Comment";

function Container({id,content,createdAt,score,user,replies}) {
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