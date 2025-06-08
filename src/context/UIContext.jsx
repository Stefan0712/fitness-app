import { createContext, useContext, useState, useCallback } from "react";
import { ConfirmationModal } from "./ConfirmationModal";
import { Toast } from "./Toast";
import {v4 as uuidv4} from 'uuid';
import styles from './UI.module.css';
const UIContext = createContext();

export const useUI = () => useContext(UIContext);

export function UIProvider({ children }) {
  const [toasts, setToasts] = useState([]); // { message, type }
  const [confirmation, setConfirmation] = useState(null); // { title, message, onConfirm }

  // Show a toast message for 3 seconds
  const showMessage = useCallback((message, type = "info") => {
    const id = uuidv4();
    const newToast = { id, message, type };

    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
    }, []);


  // Show a confirmation modal with optional title
  const showConfirmationModal = useCallback(( {title = "Are you sure?", message, onConfirm, onCancel}) => {
    setConfirmation({ title, message, onConfirm, onCancel });
  }, []);

  // Called when user confirms in the modal
  const confirm = () => {
    if (confirmation?.onConfirm) confirmation.onConfirm();
    setConfirmation(null);
  };

  // Called when user cancels
const cancel = () => {
    if (confirmation?.onCancel){
      confirmation.onCancel();
      console.log("cancel on cancel ran")
    }
    setConfirmation(null);
  };

  return (
    <UIContext.Provider value={{ showMessage, showConfirmationModal }}>
      {children}
      {toasts?.length > 0 && <div className={styles.toastsContainer}>{toasts.map((toast) => (<Toast key={toast.id} message={toast.message} type={toast.type} />))}</div>}
      {confirmation && (
        <ConfirmationModal
          title={confirmation.title}
          message={confirmation.message}
          onConfirm={confirm}
          onCancel={cancel}
        />
      )}
    </UIContext.Provider>
  );
}
