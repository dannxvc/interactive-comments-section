import '../../assets/css/Button.css';
function Button({children}) {
    return ( 
        <button type="submit" className="btn-blue">
        {children}
        </button> 
    );
}

export default Button;