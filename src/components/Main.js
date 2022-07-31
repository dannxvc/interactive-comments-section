import Comments from "./shared/Comments";
import '../assets/css/Main.css';
import NewReply from "./replies/NewReply";
function Main() {
    return ( 
        <main>
            <Comments></Comments>
            <NewReply></NewReply>
        </main>
     );
}

export default Main;