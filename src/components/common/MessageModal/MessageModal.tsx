import { IconLibrary } from '../../../IconLibrary';
import styles from './MessageModal.module.css';
import { useEffect } from 'react';
import React from 'react';

interface MessageProps {
    message: string;
    type: string;
    closeModal: ()=> void;
    functionToRun?: ()=> void;
    functionButtonText?: string;
    bottom?: number;
}
const MessageModal = ({message, type, closeModal, functionToRun, functionButtonText, bottom}) =>{

    useEffect(()=>{
        setTimeout(()=>closeModal(), 3000);
    },[])

    return (
        <div className={`${styles.modal} ${styles[type]}`} style={{bottom: bottom || '10px'}}>
            <p className={styles.message}>{message}</p>
            {functionToRun && functionButtonText ? <button className={styles['function-button']} onClick={functionToRun}>{functionButtonText}</button> : null}
            <button className={styles.close} onClick={closeModal}>
                <img className='medium-icon' src={IconLibrary.Close} alt='close message'></img>
            </button>
        </div>
    )
}


export default MessageModal;