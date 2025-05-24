import styles from "./UI.module.css";

export function Toast({ message, type }) {

  return (
    <div className={`${styles.toast} ${styles[type]}`}>
      {message}
    </div>
  );
}
