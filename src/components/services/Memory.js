import { createContext, useReducer } from "react";
import { commentData } from "../shared/CommentData";

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
          console.log(newState);

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
        case 'createComment': {
            const id= String(Math.random());
            const newState = {
                order:[...state.order, id],
                objects:{
                    ...state.objects.replies,
                    [id]: {id, ...action.comment.replies}
                }
            };
            console.log(newState);
            return newState;
        };
        
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