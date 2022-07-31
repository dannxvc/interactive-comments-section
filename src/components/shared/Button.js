import '../../assets/css/Button.css';
function Button({children}) {
    return ( 
        <button className="btn-blue">
        {children}
        </button> 
    );
}

export default Button;