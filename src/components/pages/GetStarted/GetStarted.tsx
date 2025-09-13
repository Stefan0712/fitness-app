import styles from './GetStarted.module.css';

const GetStarted = () => {
    return ( 
        <div className={styles.getStarted}>
            <div className={styles.header}>
                <h2>Welcome to</h2>
                <h1 style={{color: 'var(--accent-color'}}>EasyFit</h1>
            </div>
        </div>
     );
}
 
export default GetStarted;