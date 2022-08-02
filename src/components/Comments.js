import Container from "./Container";
import { useContext } from "react";
import { Context } from "./services/Memory";

function Comments() {
    const [state, dispatch] = useContext(Context);
    return ( 
      state.order.map(id => <Container key={id} {...state.objects[id]}></Container>)
     );
}

export default Comments;