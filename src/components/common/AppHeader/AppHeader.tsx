import styles from './AppHeader.module.css';
import { getDateForHeader } from '../../../helpers';

interface AppHeaderProps{
    title: string;
    button?: any;
}
const AppHeader: React.FC<AppHeaderProps> = ({title, button}) => {
    return ( 
        <div className={styles.header}>
            <div className={styles.headerText}>
                <div className={styles.date}>{getDateForHeader()}</div>
                <h3>{title}</h3>
            </div>
            <div className={styles.buttonContainer}>
                {button ? button : null}
            </div>
        </div>
     );
}
 
export default AppHeader;