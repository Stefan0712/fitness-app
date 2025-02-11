import { getDateForHeader } from '../../../helpers';
import styles from './Dashboard.module.css'; 
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { startOfWeek, addDays } from 'date-fns';
import { IconLibrary } from '../../../IconLibrary';
import Goal from './Goal';
import { updateDashboardLayout } from '../../../store/userSlice';
import { Link } from 'react-router-dom';
import ActivityComponent from './ActivityComponent';
import NutritionComponent from './NutritionComponent';



const Dashboard = () => {

    const dispatch = useDispatch();

    const userGoals = useSelector((state)=>state.user.userData.goals);
    const dashboardComponents = useSelector((state)=>state.user.dashboardSections);


    const [currentWeek, setCurrentWeek] = useState([])
    const [menu, setMenu] = useState(null);


    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 800);


    const getCurrentWeek = () => {
        const today = new Date();
        return Array.from({ length: 7 }, (_, i) => addDays(startOfWeek(today, { weekStartsOn: 1 }), i));
    };


    useEffect(()=>{setCurrentWeek(getCurrentWeek())},[])
    useEffect(() => {
        const handleResize = () => setIsSmallScreen(window.innerWidth < 800);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const hideSection = (sectionName) =>{
        console.log('Just hid '+sectionName)
        dispatch(updateDashboardLayout(dashboardComponents.filter(s=>s.identifier !== sectionName)));
        setMenu(null);
    }

    

    


   
    return ( 
        <div className={`${styles.dashboard} page`}>
            
            <div className={styles.header}>
                <div className={styles.date}>{getDateForHeader()}</div>
                <h2>Dashboard</h2>
                <Link to={'/edit-dashboard'} type='button' className='clear-button'><img className='small-icon' src={IconLibrary.Edit} alt=''/></Link>
            </div>
            
            {menu ? (
                <div className={styles.menu}>
                    <h3>{menu?.title}</h3>
                    <button type='button' onClick={()=>hideSection(menu.sectionName)}>Hide Section</button>
                    <button type='button' onClick={()=>setMenu(null)}>Cancel</button>
                </div>  
            ) : null}


        <div className={styles['dashboard-content']}>
        {dashboardComponents && dashboardComponents.length > 0 ? (
            dashboardComponents.map((item, index) => {
            // For better performance, create a goal map outside the rendering loop if it's needed multiple times
            const goal = userGoals.find(goal => goal.id === item.identifier);

            if (item.type === 'goal' && goal) {
                return <Goal key={'goal-' + index} data={goal} />;
            }

            if (item.type === 'section') {
                if (item.identifier === 'activity') {
                return <ActivityComponent key={'activity-' + index} isSmallScreen={isSmallScreen} setMenu={setMenu} />;
                }

                if (item.identifier === 'nutrition') {
                return <NutritionComponent key={'nutrition-' + index} isSmallScreen={isSmallScreen} setMenu={setMenu} />;
                }
            }

            return null; // If none of the conditions match, render nothing.
            })
        ) : null}
        </div>

            

        </div>
     );
}
 
export default Dashboard;