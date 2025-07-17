import styles from "./UI.module.css";

export function Toast({ message, type, removeToast}) {

  return (
    <div className={`${styles.toast} ${styles[type]}`} onClick={removeToast}>
      {message}
    </div>
  );
}
