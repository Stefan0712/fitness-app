import './stylings/modal.css';



const Modal = ({type, title, message, positiveOnClick, negativeOnClick, confirmationOnClick}) => {
    return ( 
        <div className={`modal ${type}`}>
            <div className="modal-header">
                <h2>{title}</h2>
            </div>
            <div className="modal-message"><p>{message}</p></div>
            <div className="modal-buttons">
                {positiveOnClick ? <button onClick={positiveOnClick} className="green-button">Confirm</button> : ''}
                {negativeOnClick ? <button onClick={negativeOnClick} className="red-button">Cancel</button> : ''}
                {confirmationOnClick ? <button onClick={confirmationOnClick} className="ok-button">OK</button> : ''}
            </div>
        </div>
     );
}
 
export default Modal;