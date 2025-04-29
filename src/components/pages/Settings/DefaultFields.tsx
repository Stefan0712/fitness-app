import { getDateForHeader } from '../../../helpers';
import styles from './DefaultFields.module.css';
import React from 'react';

const DefaultFields = () => {
    return ( 
        <div className={styles['default-fields']}>
            <div className='header'>
                <div className='date'>{getDateForHeader()}</div>
                <h2>Library</h2>
            </div>
            <h1>Default Fields</h1>
        </div>
     );
}
 
export default DefaultFields;