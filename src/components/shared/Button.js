import '../../assets/css/Button.css';
function Button({children, className}) {
    return ( 
        <button type="submit" className={`btn-blue ${className}`}>
        {children}
        </button> 
    );
}

export default Button;