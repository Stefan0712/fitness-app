import './stylings/modal.css';



const Modal = ({type, title, message, positiveOnClick, negativeOnClick, confirmationOnClick}) => {
    return ( 
        <div className={`modal ${type}`}>
             <div className='modal-title'>{title}</div>   
            <div className="modal-message"><p>{message}</p></div>
            <div className="modal-buttons">
                {positiveOnClick ? <button onClick={positiveOnClick} className="green-button">Confirm</button> : ''}
                {negativeOnClick ? <button onClick={negativeOnClick} className="cancel-button">Cancel</button> : ''}
                {confirmationOnClick ? <button onClick={confirmationOnClick} className="ok-button">OK</button> : ''}
            </div>
        </div>
     );
}
 
export default Modal;