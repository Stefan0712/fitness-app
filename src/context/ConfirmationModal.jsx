import styles from './UI.module.css'
import { useUI } from './UIContext';

export function ConfirmationModal({ title, message, onConfirm, onCancel  }) {

    const { hideConfirmationModal } = useUI();

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      hideConfirmationModal(); // just close the modal if no onCancel is provided
    }
  };


  return (
    <div className={styles.confirmModal}>
        <div className={styles.title}>{title}</div>
      <div className={styles.content}>
        <p className={styles.message}>{message}</p>
        <div  className={styles.buttons}>
          <button onClick={handleCancel} className={styles.cancel}>Cancel</button>
          <button onClick={onConfirm} className={styles.confirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
}
