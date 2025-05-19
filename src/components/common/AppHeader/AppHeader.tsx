import styles from './AppHeader.module.css';
import { getDateForHeader } from '../../../helpers';

const AppHeader = ({title, button}) => {
    return ( 
        <div className={styles.header}>
            <div className={styles.date}>{getDateForHeader()}</div>
            <h2>{title}</h2>
            {button ? button : null}
        </div>
     );
}
 
export default AppHeader;