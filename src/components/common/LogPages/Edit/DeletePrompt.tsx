import { useDispatch } from 'react-redux';
import { IconLibrary } from '../../../../IconLibrary';
import styles from './Edit.module.css';
import React from 'react';
import { removeGoal } from '../../../../store/userSlice.ts';

interface DeletePromptProps{
    id: string;
    closeModal: ()=>void;
    sendMessage: () => void;
}

const DeletePrompt: React.FC<DeletePromptProps> = ({id, closeModal, sendMessage}) => {

    const dispatch = useDispatch();

    const handleDeleteGoal = () =>{
        dispatch(removeGoal(id));
        sendMessage();
        closeModal();
    }
    return ( 
        <div className={styles['delete-prompt']}>
            <div className={styles.top}>
                <h3>Are you sure?</h3>
                <button className={styles.close}><img className='small-icon' src={IconLibrary.Close} alt='close modal' /></button>
            </div>
            <div className={styles.message}>
                This action will remove all logs made for this log during today. Logs saved in the past will still be saved and can be deleted separately.
            </div>
            <div className={styles.buttons}>
                <button type='button' className={styles.confirm} onClick={handleDeleteGoal}>Confirm</button>
                <button type='button' className={styles.cancel} onClick={closeModal}>Cancel</button>
            </div>
        </div>
    );
}
 
export default DeletePrompt;