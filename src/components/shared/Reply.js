import '../../assets/css/Comment.css';
import ButtonVote from './ButtonVote';

function Reply({content,createdAt,score,user,replyingTo}) {
    return ( 
        <div className="container reply-container">
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
                        <div className="btns">                        
                            {user.username==="juliusomo" && 
                                <button className="btn btn-delete">
                                    <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg"><path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" fill="#ED6368"/></svg>
                                    <span>Delete</span>     
                                </button>
                            }
                            <button className="btn btn-reply">
                                <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg"><path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" fill="#5357B6"/></svg>
                                <span>Reply</span>     
                            </button>
                        </div>
                    </div>  
                    <div className="comment-description">
                        <p><span className="user-replying-to">@{replyingTo}</span> {content}</p>
                    </div> 
                </div>
        </div>
     );
}

export default Reply;