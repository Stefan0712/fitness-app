import styles from './Dashboard.module.css';
import { useEffect, useState } from 'react';
import { IconLibrary } from '../../../IconLibrary';
import { useNavigate } from 'react-router-dom';
import AppHeader from '../../common/AppHeader/AppHeader.tsx';
import {getAllItems, saveItem} from '../../../db.js';
import SmallGoal from './Modules/SmallGoal/SmallGoal.tsx';

const DashboardLayout = () => {

  const navigate = useNavigate();

  const [goals, setGoals] = useState([]);
  const [showDisabledComponents, setShowDisabledComponents] = useState(false);


  const getGoals = async () =>{
    try{
      const response = await getAllItems('goals');
      const normalized = await normalizeGoalOrder(response);
      setGoals(normalized);
    }catch(error){
      console.error(error)
    }
  }
  useEffect(()=>{
    
    getGoals();
  },[]);

  const toggleGoal = (goal) =>{
    console.log(goal.order);
    const tempGoals = goals;
    setGoals(prev=>prev.map(item=>item._id === goal._id ? {...item, pinToDashboard: !item.pinToDashboard} : item));
  }

  const normalizeGoalOrder = async (goals) => {
    const normalizedGoals = goals
      .filter(goal => goal)
      .sort((a, b) => (a.order ?? 9999) - (b.order ?? 9999))
      .map((goal, index) => ({...goal, order: index}));
    for (const goal of normalizedGoals) {
      await saveItem('goals', goal);
    }
    return normalizedGoals;
};



  return (
    <div className={`${styles['dashboard-layout']} page`}>
      <AppHeader title={'Edit Dashboard'} />
      <div className={styles.enabledComponents}>
        <h4>Enabled Components</h4>
        <div className={styles.componentsContainer}>
          {goals && goals.length > 0 ? goals
          .filter(item=>item.pinToDashboard)
          .map(goal=><SmallGoal key={goal._id} toggleGoal={toggleGoal} goal={goal} editMode={true} />) : <p>No components to show</p>}
        </div>
      </div>
      <div className={`${styles.disabledComponents} ${showDisabledComponents ? styles.expandedDisabled : ''}`}>
        <button className={styles.showDisabledButton} onClick={()=>setShowDisabledComponents(prev=>!prev)}><img src={IconLibrary.Arrow} alt=''/></button>
        <div className={styles.componentsContainer}>
          {goals && goals.length > 0 ? goals.filter(item=>!item.pinToDashboard).map(goal=><SmallGoal goalsLength={goals.filter(item=>item.pinToDashboard).length} key={goal._id} toggleGoal={toggleGoal} goal={goal} editMode={true} />) : <p>No components to show</p>}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
