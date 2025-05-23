import styles from './Library.module.css';
import { IconLibrary } from '../../../IconLibrary';
import { Link } from 'react-router-dom';
import { makeFirstUpperCase } from '../../../helpers';

const Exercise = ({data, id, type}) => {
    return ( 
        <Link to={`/exercise/${id}/view/${type === 'online' ? '?type=online' : type !== 'online' && data.isCached ? '?type=cached' : ''}`} className={styles["item-body"]}>
            <div className={styles["item-info"]}>
                <h4>{data.name}</h4>
                <div className={styles["item-description"]}>
                    <p>{data.sets} Sets</p>
                    <p>{data.category?.name || null}</p>
                    <p>{makeFirstUpperCase(data?.difficulty || '')}</p>
                </div>
            </div>
            <div className={styles["item-button"]}>
                <img className="small-icon" src={IconLibrary.Arrow} alt="icon" />
            </div>
        </Link>
     );
}
 
export default Exercise;