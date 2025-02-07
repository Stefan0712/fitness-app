import { getDateForHeader, makeFirstUpperCase } from '../../../helpers';
import styles from './Dashboard.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { updateDashboardLayout } from '../../../store/userSlice';
import { IconLibrary } from '../../../IconLibrary';

const DashboardLayout = () => {

    const dispatch = useDispatch();


    const goals = useSelector((state)=>state.user.userData.goals);
    const enabledComponents = useSelector((state)=>state.user.dashboardSections);
    const [orderedComponents, setOrderedComponents] = useState(enabledComponents || [])
    const allSections = [
        {name: "Activity", type: 'section', identifier: 'activity'},
        {name: "Nutrition", type: 'section', identifier: 'nutrition'}
    ];
    
    const showComponent = (item) =>{
        dispatch(updateDashboardLayout({...item, order: enabledComponents[-1].order+1}))
    }
    const moveUp = (identifier) =>{
        let items = [...enabledComponents]
        const itemIndex = items.findIndex(item => item.identifier === identifier);
        
        // Find the item that currently has order 1
        const currentFirstIndex = items.findIndex(item => item.order === 1);
        if (currentFirstIndex === -1) setOrderedComponents(items); // If there's no item with order 1, return as is
        
        // Swap the order values
        items[itemIndex].order = 1;
        items[currentFirstIndex].order = 2;
        
        setOrderedComponents(items)
        console.log(items)
    }
    const moveDown = () =>{

    }
    return ( 
        <div className={`${styles['dashboard-layout']} page`}>
            <div className={styles.header}>
                <div className={styles.date}>{getDateForHeader()}</div>
                <h2>Edit Dashboard</h2>
            </div>
            <h2>Enabled Components</h2>
            <div className={styles['enabled-components']}>
                {orderedComponents?.map(item=>(
                    <div className={styles['component']}>
                        <div className={styles['order-buttons']}>
                            <button className='clear-button' onClick={()=>moveUp(item.identifier)}><img src={IconLibrary.Arrow} style={{transform: 'rotateZ(270deg)'}} className='small-icon' alt=''></img></button>
                            <button className='clear-button'><img src={IconLibrary.Arrow} style={{transform: 'rotateZ(90deg)'}} className='small-icon' alt=''></img></button>
                        </div> 
                        <p>{goals?.find(i=>i.id===item.identifier)?.name || allSections?.find(i=>i.identifier===item.identifier)?.name}</p>
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