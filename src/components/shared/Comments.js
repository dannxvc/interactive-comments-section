import Comment from "./Comment";import { useContext } from "react";
import { Context } from "../services/Memory";

function Comments() {
    const [state, dispatch] = useContext(Context);
    return ( 
      state.order.map(id => <Comment key={id} {...state.objects[id]}></Comment>)
     );
}

export default Comments;