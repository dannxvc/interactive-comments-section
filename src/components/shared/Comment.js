import '../../assets/css/Comment.css';
import ButtonAction from './ButtonAction';
import ButtonVote from './ButtonVote';

function Comment({id,content,createdAt,score,user,replyingTo}) {
    return ( 
        <div className={replyingTo && `reply-container`}>
             {replyingTo &&<div className="reply-separator"></div>}
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
                            id={id}
                            user={user}
                        />
                    </div>  
                    <div className="comment-description">
                        <p>
                            {replyingTo && <span className="user-replying-to">@{replyingTo}</span>} 
                            {content}
                        </p>
                    </div> 
                </div>
            </div>
        </div>
     );
}

export default Comment;