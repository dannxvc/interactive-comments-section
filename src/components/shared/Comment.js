import '../../assets/css/Comment.css';
import ButtonVote from './ButtonVote';
import Reply from './Reply';
// import {default as PersonOne} from '../../assets/img/avatars/image-amyrobson.png';

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
                        <div className="btns">                        
                            <button className="btn btn-reply">
                                <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg"><path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" fill="#5357B6"/></svg>
                                <span>Reply</span>     
                            </button>
                        </div>
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