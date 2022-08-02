import '../assets/css/Comment.css';
import ButtonAction from './shared/ButtonAction';
import ButtonVote from './shared/ButtonVote';

function Reply({content,createdAt,score,user,replyingTo}) {
    return ( 
        <div className="reply-container">
            <div className="reply-separator">

            </div>
            <div className="container">
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
                        <p><span className="user-replying-to">@{replyingTo}</span> {content}</p>
                    </div> 
                </div>
            </div>
                
        </div>
     );
}

export default Reply;