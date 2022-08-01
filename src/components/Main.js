import Comments from "./Comments";
import '../assets/css/Main.css';
import NewComment from "./replies/NewComment";
function Main() {
    return ( 
        <main>
            <Comments></Comments>
            <NewComment></NewComment>
        </main>
     );
}

export default Main;