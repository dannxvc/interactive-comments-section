import '../assets/css/Comment.css';
import ButtonAction from './shared/ButtonAction';
import ButtonVote from './shared/ButtonVote';
import Reply from './Reply';

function Comment({content,createdAt,score,user,replies}) {
    return ( 
        <section className="main-container">
            <div className="container comment-container">
                <ButtonVote
                    score={score}
                />
                <div className="comment">
                    <div className="comment-author">
                        <div className="author-details">
                            <img src={user.image} className="img-author" alt="Author icon"></img>
                            <div className="author-username">
                                <p className="name-author">{user.username}</p>
                                {user.username==="juliusomo" && <div className="tag-author">you</div>}
                            </div>
                                <span className="comment-age">{createdAt}</span>
                        </div>
                        <ButtonAction
                            user={user}
                        />
                    </div>  
                    <div className="comment-description">
                        <p>{content}</p>
                    </div> 
                </div>
            </div>
            {replies.map(reply => <Reply key={reply.id} {...reply}>
         
            </Reply>)}
        </section>
     );
}

export default Comment;