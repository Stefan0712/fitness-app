import { getDateForHeader, makeFirstUpperCase } from '../../../helpers';
import styles from './Dashboard.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { updateDashboardLayout } from '../../../store/userSlice';
import { IconLibrary } from '../../../IconLibrary';

const DashboardLayout = () => {

    const dispatch = useDispatch();


    const goals = useSelector((state)=>state.user.userData.goals);
    console.log(goals)
    const enabledComponents = useSelector((state)=>state.user.dashboardSections);
    const allSections = [
        {type: 'section', oder: 1, identifier: 'activity'},
        {type: 'section', oder: 2, identifier: 'nutrition'}
    ];
    
    const showComponent = (item) =>{
        dispatch(updateDashboardLayout({...item, order: enabledComponents[-1].order+1}))
    }

    return ( 
        <div className={`${styles['dashboard-layout']} page`}>
            <div className={styles.header}>
                <div className={styles.date}>{getDateForHeader()}</div>
                <h2>Edit Dashboard</h2>
            </div>
            <h2>Enabled Components</h2>
            <div className={styles['enabled-components']}>
                {enabledComponents?.filter(i=>i.type==="goal").map(item=>(
                    <div className={styles['component']}>
                        <div className={styles['order-buttons']}>
                            <button className='clear-button'><img src={IconLibrary.Arrow} style={{transform: 'rotateZ(270deg)'}} className='small-icon' alt=''></img></button>
                            <button className='clear-button'><img src={IconLibrary.Arrow} style={{transform: 'rotateZ(90deg)'}} className='small-icon' alt=''></img></button>
                        </div> 
                        <p>{goals?.find(i=>i.id===item.identifier)?.name}</p>
                        <button className='clear-button'><img src={IconLibrary.Close} className='small-icon' alt=''></img></button>
                    </div>
                ))}
                {enabledComponents?.filter(i=>i.type==="section").map(item=>(
                    <div className={styles['component']}>
                        <div className={styles['order-buttons']}>
                            <button className='clear-button'><img src={IconLibrary.Arrow} style={{transform: 'rotateZ(270deg)'}} className='small-icon' alt=''></img></button>
                            <button className='clear-button'><img src={IconLibrary.Arrow} style={{transform: 'rotateZ(90deg)'}} className='small-icon' alt=''></img></button>
                        </div>
                        <p>{makeFirstUpperCase(item.identifier)}</p>
                        <button className='clear-button'><img src={IconLibrary.Close} className='small-icon' alt=''></img></button>
                    </div>
                ))}
            </div>
            <h2>Disabled Components</h2>
            <div className={styles['disabled-components']}>
                {goals?.filter(goal=>!enabledComponents.some(i=>i.identifier===goal.id)).map(item=>(
                    <div className={styles['component']}>
                        <p>{item.name}</p>
                        <button className='clear-button'><img src={IconLibrary.Add} className='small-icon' alt=''></img></button>
                    </div>
                ))}
                {allSections?.filter(section=>!enabledComponents.some(i=>i.identifier===section.identifier)).map(item=>(
                    <div className={styles['component']}>
                        <p>{makeFirstUpperCase(item.identifier)}</p>
                        <button className='clear-button'><img src={IconLibrary.Add} className='small-icon' alt=''></img></button>
                    </div>
                ))}
            </div>
        </div>
     );
}
 
export default DashboardLayout;