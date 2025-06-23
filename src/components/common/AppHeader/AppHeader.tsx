import styles from './AppHeader.module.css';
import { getDateForHeader } from '../../../helpers';

interface AppHeaderProps{
    title: string;
    button?: any;
}
const AppHeader: React.FC<AppHeaderProps> = ({title, button}) => {
    return ( 
        <div className={styles.header}>
            <div className={styles.date}>{getDateForHeader()}</div>
            <h3>{title}</h3>
            {button ? button : null}
        </div>
     );
}
 
export default AppHeader;