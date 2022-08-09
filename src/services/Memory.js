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
            console.log(newState);

            return newState;
        };
        // case 'updateReply':{
        //     const id = action.parentId;
        //     const reply = ;
        //     state.objects[id] = {
        //             ...state.objects[id],
        //             ...action.comment
        //     };
        //     const newState = {...state};
        //     console.log(newState);

        //     return newState;
        // };
        case 'createReply': {
            const commentId = action.commentId;
            const parentId= action.parentId;
            const parentReplies=action.parentReplies;
            const id = String(Math.random());
            // const newOrder = state.order.filter(item => item !== parentId);
            // let newReplies=action.parentReplies.filter(item => item !== parentReplies);
            console.log(parentId);
            // console.log(newReplies);
           if(parentId===undefined){
            state.objects[commentId][parentReplies]= {
                ...state.objects[id],
                [parentReplies]:[parentReplies,{id,...action.comment}]
            }; 
           } else{
               state.objects[parentId][parentReplies]= {
                ...state.objects[id],
                [parentReplies]:[parentReplies,{id,...action.comment}]
            }; 
           }
            
            const newState = {
                ...state
            };

           console.log(newState);

            return newState;
        };
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