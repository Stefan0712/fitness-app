import { createContext, useContext, useState, useCallback } from "react";
import { ConfirmationModal } from "./ConfirmationModal";
import { Toast } from "./Toast";

const UIContext = createContext();

export const useUI = () => useContext(UIContext);

export function UIProvider({ children }) {
  const [toast, setToast] = useState(null); // { message, type }
  const [confirmation, setConfirmation] = useState(null); // { title, message, onConfirm }

  // Show a toast message for 3 seconds
  const showMessage = useCallback((message, type = "info") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  // Show a confirmation modal with optional title
  const showConfirmationModal = useCallback((message, onConfirm, title = "Are you sure?") => {
    setConfirmation({ title, message, onConfirm });
  }, []);

  // Called when user confirms in the modal
  const confirm = () => {
    if (confirmation?.onConfirm) confirmation.onConfirm();
    setConfirmation(null);
  };

  // Called when user cancels
  const cancel = () => setConfirmation(null);

  return (
    <UIContext.Provider value={{ showMessage, showConfirmationModal }}>
      {children}
      {toast && <Toast message={toast.message} type={toast.type} />}
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
