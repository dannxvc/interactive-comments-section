import { createContext, useReducer } from "react";
import {default as PersonOne} from '../../assets/img/avatars/image-amyrobson.png';
import {default as PersonTwo} from '../../assets/img/avatars/image-maxblagun.png';
import {default as ReplyOne} from '../../assets/img/avatars/image-ramsesmiron.png';
import {default as ReplyMe} from '../../assets/img/avatars/image-juliusomo.png';

const commentMock = {
    "currentUser": {
      "image": "./images/avatars/image-juliusomo.png",
      "username": "juliusomo"
    },
    "comments": [
      {
        "id": 1,
        "content": "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
        "createdAt": "1 month ago",
        "score": 12,
        "user": {
          "image": PersonOne,
          "username": "amyrobson"
        },
        "replies": []
      },
      {
        "id": 2,
        "content": "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
        "createdAt": "2 weeks ago",
        "score": 5,
        "user": {
          "image": PersonTwo,
          "username": "maxblagun"
        },
        "replies": [
          {
            "id": 3,
            "content": "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
            "createdAt": "1 week ago",
            "score": 4,
            "replyingTo": "maxblagun",
            "user": {
              "image": ReplyOne,
              "username": "ramsesmiron"
            }
          },
          {
            "id": 4,
            "content": "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
            "createdAt": "2 days ago",
            "score": 2,
            "replyingTo": "ramsesmiron",
            "user": {
              "image": ReplyMe,
              "username": "juliusomo"
            }
          }
        ]
      },
    ]
};

const initialState = {
    order:[],
    objects:{}
}

function reductor(state, action){
    switch(action.type){
        case 'place': {
            const commentsGeneral = action.commentsGeneral;
            const newState = {
                order:commentsGeneral.comments.map(comment => comment.id),
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
    }
}
const comments=reductor(initialState,{type: 'place',commentsGeneral:commentMock});
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