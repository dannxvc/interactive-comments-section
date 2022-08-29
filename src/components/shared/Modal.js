import { useContext } from 'react';
import { Context } from "../../services/Memory";
import '../../assets/css/Modal.css';

function Modal({classModal,id,parentId,rootid,handleCancelClick}) {

    const [, dispatch] = useContext(Context);

    const deleteComment = (e) => {
        e.preventDefault();
        dispatch({type: 'deleteComment', id:id});
    }
    
    const deleteReply= (e) => {
        e.preventDefault();
        dispatch({type: 'deleteReply', parentId: parentId, rootid:rootid, idActual:id});
    }
    return ( 
        <div className={`modal ${classModal}`}>
            <div className="modal-alert">
                <h2 className="modal-title">
                    Delete comment
                </h2>
                <p className="modal-description">Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
                <div className="modal-btns">
                    <button className="btn-modal btn-gray" onClick={handleCancelClick}>NO, CANCEL</button>
                    <button className="btn-modal btn-red" onClick={parentId?deleteReply:deleteComment}>YES, DELETE</button>
                </div>
            </div>
        </div>
     );
}

export default Modal;