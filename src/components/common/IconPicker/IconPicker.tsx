// The Icon Picker is a simple list of icons provided to users to let them customize their goals more. Each of the icons provided is a react component that takes props such as width, height, and color
// The icon object is something like { id: 'calories', name: 'Calories', icon: Calories } instead of just saving the icon component because there are some issues with saving react components to IDB

import styles from './IconPicker.module.css';
import { iconList } from '../../../icons';
import { IconLibrary } from '../../../IconLibrary';
import React from 'react';

interface IconPickerProps {
    handleIcon: (icon: string) => void;
    closeModal: ()=>void;
    currentIcon?: string;
}
const IconPicker: React.FC<IconPickerProps> = ({handleIcon, closeModal, currentIcon}) => {

    const IconComponent = iconList.find(item => item.id === currentIcon)?.icon; // Get the selected icon to show a preview of it inside the Icon Picker

    return ( 
        <div className={styles['icon-picker']}>
            <div className={styles.top}>
                {IconComponent && <IconComponent fill="white" stroke="none" width="30px" height="30px"/>}
                <h3>Select an icon</h3>
                <button className={styles['close-button']} onClick={closeModal}><img src={IconLibrary.Close} className='small-icon' alt='close icon picker' /></button>
            </div>
            <div className={styles.container}>
                {iconList.map((icon, index) => {
                    const ItemIcon = icon.icon;
                    return (
                        <div
                            key={index}
                            className={`${styles['icon-button']} ${currentIcon === icon.id ? styles['selected'] : ''}`}
                            onClick={() => (handleIcon(icon.id), closeModal())}
                        >
                            <ItemIcon fill="white" stroke="none" width="30px" height="30px" />
                        </div>
                    );
                })}
            </div>
            <button type='button' className={styles['save-icon-button']} onClick={closeModal}>Close</button>
        </div>
     );
}
 
export default IconPicker;