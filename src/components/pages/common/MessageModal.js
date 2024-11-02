const MessageModal = ({type, title, msg}) => {
    return ( 
        <div className={`message-modal ${type}`}>
            <h3>{title}</h3>
            <div className="message-modal-text">
                <p>{msg}</p>
            </div>
        </div>
     );
}
 
export default MessageModal;