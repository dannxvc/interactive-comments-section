import { createContext, useReducer } from "react";
import { commentData } from "../components/shared/CommentData";

const memory = localStorage.getItem('comments');
const initialState = memory
? JSON.parse(memory)
: {
    order:[],
    objects:{}
}

function reductor(state, action){
    switch(action.type){
        case 'place': {
            const commentsGeneral = action.commentsGeneral;
            const newState = {
                order:commentsGeneral.comments.map((comment) => comment.id),
                objects:commentsGeneral.comments.reduce((object, comment)=>({...object, [comment.id]:comment}),{})
            };
            localStorage.setItem('comments',JSON.stringify(newState));
            return newState;
        };
        case 'createComment': {
            const id= String(Math.random());
            const newState = {
                order:[...state.order, id],
                objects:{
                    ...state.objects,
                    [id]: {id, ...action.comment}
                }
            };
            localStorage.setItem('comments',JSON.stringify(newState));
            return newState;
        };
        case 'deleteComment': {
            const id= action.id;
            const newOrder = state.order.filter(item => item !== id);
            delete state.objects[id];
            const newState = {
                order:newOrder,
                objects:state.objects
            };
            localStorage.setItem('comments',JSON.stringify(newState));
            return newState;
        };  
        case 'updateComment':{
            const id = action.comment.id;
            state.objects[id] = {
                ...state.objects[id],
                ...action.comment
            };
            const newState = {...state};
            localStorage.setItem('comments',JSON.stringify(newState));
            return newState;
        };

        case 'createReply': {
                
            const newState = {
                order:[...state.order],
                objects:{
                    ...state.objects
                }
            };

            const commentId = action.commentId;
            let newReplyObject = action.comment;
            // const maxValueId = action.maxValueId;
            const maxValueId = String(Math.random());

            newReplyObject = {id: maxValueId,...newReplyObject};

            const findInsideReplies = (repliesArray, parentID)=>{                
                repliesArray.map((reply)=>{    
                    if(reply.id === parentID){
                        return reply.replies = [...reply.replies, newReplyObject];
                    };
                    if(reply.replies.length > 0){
                        return findInsideReplies(reply.replies, parentID);
                    };
                });
            };
            const findParent = (comments)=>{
                for(let key in comments){
                    if(comments[key].id === commentId){
                        return newState.objects[key].replies = [...newState.objects[key].replies,newReplyObject];
                    };
                    findInsideReplies(comments[key].replies, commentId);
                };
            };
            findParent(state.objects);
            localStorage.setItem('comments',JSON.stringify(newState));
            return newState;
        };

        case 'updateReply':{
            const idActual= action.reply.id;
            const parentId=action.parentId;
            const rootid=action.rootid;
            const replyUpdated= action.reply;
   
            const findInsideReplies = (repliesArray, parentID)=>{                
                repliesArray.map((reply)=>{    
                    if(reply.id === parentId){
                            let replyIndex = reply.replies.findIndex(reply =>reply.id===idActual);
                        if(replyIndex !== -1){
                            reply.replies[replyIndex] = replyUpdated;
                            return reply;
                        };
                    };
                    if(reply.replies.length > 0){
                            return findInsideReplies(reply.replies, parentID);
                    };
                });
            };

            const findParent = (reply)=>{
                for(let key in reply){
                    let replyIndex = reply[key].replies.findIndex(reply =>reply.id===idActual);
                    if(replyIndex !== -1){
                        reply[key].replies[replyIndex] = replyUpdated;
                        return reply;
                    }
                    findInsideReplies(reply[key].replies, rootid);
                };
            };

            findParent(state.objects);
            const newState={...state};
            localStorage.setItem('comments',JSON.stringify(newState));
            return newState;
        };
        
        case 'deleteReply': {
                const idActual= action.idActual;
                const parentId=action.parentId;
                const rootid=action.rootid;
                const newState = {...state
                };

                const findInsideReplies = (repliesArray, parentID)=>{                
                    repliesArray.map((reply)=>{    
                        if(reply.id === parentId){
                                let replyIndex = reply.replies.findIndex(reply =>reply.id===idActual);
                            if(replyIndex !== -1){
                                reply.replies.splice(replyIndex,1);
                                return reply;
                            };
                        };
                        if(reply.replies.length > 0){
                            return findInsideReplies(reply.replies, parentID);
                        };
                    });
                };
    
                const findParent = (reply)=>{
                    for(let key in reply){
                        let replyIndex = reply[key].replies.findIndex(reply =>reply.id===idActual);
                        if(replyIndex !== -1){
                           reply[key].replies.splice(replyIndex,1);
                            return reply;
                        }
                        findInsideReplies(reply[key].replies, rootid);
                    };
                };
                findParent(state.objects);
            localStorage.setItem('comments',JSON.stringify(newState));
            return newState;
        };

        default:
        throw new Error();
    }
}

const comments=reductor(initialState,{type: 'place',commentsGeneral:commentData});
// reductor(initialState,{type: 'place',commentsGeneral:commentData});

export const Context = createContext(null);

function Memory({children}) {
    const [state, dispatch] = useReducer(reductor, comments);
    return ( 
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    );
}

export default Memory;