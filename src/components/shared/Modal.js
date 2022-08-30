import { useContext } from 'react';
import { Context } from "../../services/Memory";
import '../../assets/css/Modal.css';
import { useRef } from "react";
import { useInView } from "framer-motion";

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
    
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    return ( 
        <div className={`modal ${classModal}`}>
            <div 
                className="modal-alert" 
                ref={ref}
                style={{
                    transform: isInView ? "none" : "translateY(200px)",
                    opacity: isInView ? 1 : 0,
                    transition: "all 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) 0.1s"
                }}
            >
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