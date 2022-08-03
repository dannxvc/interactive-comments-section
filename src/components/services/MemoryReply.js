const initialReplyState = {
    order:[],
    objects:{}
}
const replyReducer = (state, action) => {
    const {type}=action;

    switch(type){
        case "ADD_REPLY":
            console.log("ADD_REPLY");
            return{
                ...state,
                
            }
    }
}
function MemoryReply() {
    const [state, dispatch] = useReducer(reductor, replies);
    return ( 
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    );
}

export default MemoryReply;