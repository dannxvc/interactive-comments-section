import { createContext, useReducer } from "react";
import { commentData } from "../components/shared/CommentData";

const initialState = {
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
            return newState;
        };
        case 'createComment': {
            // const id = action.comment.id;
            const id= String(Math.random());
            const newState = {
                order:[...state.order, id],
                objects:{
                    ...state.objects,
                    [id]: {id, ...action.comment}
                }
            };
          console.log(newState);

            return newState;
        };
        case 'deleteComment': {
            const id= action.id;
            const newOrder = state.order.filter(item => item !== id);
            console.log(state.objects[id]);
            delete state.objects[id];
            const newState = {
                order:newOrder,
                objects:state.objects
            };
            return newState;
        };  
        case 'updateComment':{
            const id = action.comment.id;
            // const parentId = action.parentId;
            state.objects[id] = {
                    ...state.objects[id],
                    ...action.comment
            };
            const newState = {...state};

            return newState;
        };
        case 'updateReply':{
            const parentId = action.parentId;
            const id = action.reply.id;
       
            state.objects[parentId].replies[state.objects[parentId].replies.findIndex(reply =>{
                if(reply.id===id){return true}
            })] = {
                ...state.objects[parentId].replies[state.objects[parentId].replies.findIndex(reply =>{
                    if(reply.id===id){return true}
                })],
                    ...action.reply
            };
            const newState = {...state};

            return newState;
        };
        case 'createReply': {

            const newState = {
                order:[...state.order],
                objects:{
                    ...state.objects
                }
            }

            const commentId = action.commentId;
            let newReplyObject = action.comment;
            const maxValueId = action.maxValueId
            // adding the id for the new reply object
            newReplyObject = {id: maxValueId,...newReplyObject}

            const findInsideReplies = (repliesArray, parentID)=>{                
                repliesArray.map((reply)=>{    
                    // condition to stop recursion and add the new reply
                    if(reply.id === parentID){
                        return reply.replies = [...reply.replies, newReplyObject]
                    } 
                    // condition to start the recursive behavior
                    if(reply.replies.length > 0){
                        return findInsideReplies(reply.replies, parentID)
                    }
                })
            }
            // the comments argument is the state.objects
            const findParent = (comments)=>{
                for(let key in comments){
                    if(comments[key].id === commentId){
                        return newState.objects[key].replies = [...newState.objects[key].replies,newReplyObject]
                    }
                    // if condition doesn't work, run the following function to go deeper
                    findInsideReplies(comments[key].replies, commentId)
                }
            }
            findParent(state.objects)
            console.log(newState)
            return newState;
        }
        default:
        throw new Error();
    }
}

const comments=reductor(initialState,{type: 'place',commentsGeneral:commentData});

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