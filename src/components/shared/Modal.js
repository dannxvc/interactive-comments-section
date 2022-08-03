import { useContext, useEffect } from 'react';
import { Context } from "../services/Memory";
import '../../assets/css/Modal.css';

function Modal({classModal,id,handleDeleteClick}) {

    const [state, dispatch] = useContext(Context);
    const deleteComment = (e) => {
        e.preventDefault();
        dispatch({type: 'deleteComment', id:id});
    }

    useEffect(() => {
    },[id]);

    return ( 
        <div className={`modal ${classModal}`}>
            <div className="modal-alert">
                <h2 className="modal-title">
                    Delete comment
                </h2>
                <p className="modal-description">Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
                <div className="modal-btns">
                    <button className="btn-modal btn-gray" onClick={handleDeleteClick}>NO, CANCEL</button>
                    <button className="btn-modal btn-red" onClick={deleteComment}>YES, DELETE</button>
                </div>
            </div>
        </div>
     );
}

export default Modal;