import styles from './EditDashboard.module.css';
import { useEffect, useState } from 'react';
import { IconLibrary } from '../../../IconLibrary';
import AppHeader from '../../common/AppHeader/AppHeader.tsx';
import {getAllItems, saveMultipleItems} from '../../../db.js';
import { iconList } from '../../../icons.js';
import ProgressCircle from '../../common/SVG/ProgressCircle.tsx';
import ProgressBar from '../../common/SVG/ProgressBar.tsx';
import { useUI } from '../../../context/UIContext.jsx';
import { useNavigate } from 'react-router-dom';

const DashboardLayout = () => {

  const {showMessage} = useUI();
  const navigate = useNavigate();

  const [goals, setGoals] = useState([]);


  const getGoals = async () =>{
    try{
      const response = await getAllItems('goals');
      setGoals(normalizeOrder(response));
    }catch(error){
      console.error(error)
    }
  }
  useEffect(()=>{
    getGoals();
  },[]);

  const normalizeOrder = (items) =>{
    const sorted = [...items].sort((a, b) => a.order - b.order);
    return sorted.map((item, index) => ({
      ...item,
      order: index + 1,
    }));
  }


  // Move goal UP
  const moveUp = (id) => {
    setGoals(prev => {
      const normalized = normalizeOrder(prev);
      const index = normalized.findIndex(g => g._id === id);
      if (index <= 0) return normalized; 
      [normalized[index].order, normalized[index - 1].order] = [normalized[index - 1].order, normalized[index].order];
      return normalized.sort((a, b) => a.order - b.order);
    });
  };

  // Move goal DOWN
  const moveDown = (id) => {
    setGoals(prev => {
      const normalized = normalizeOrder(prev);
      const index = normalized.findIndex(g => g._id === id);
      if (index === -1 || index >= normalized.length - 1) return normalized; 
      [normalized[index].order, normalized[index + 1].order] = [normalized[index + 1].order, normalized[index].order];
      return normalized.sort((a, b) => a.order - b.order);
    });
  };

  const handleSave = async () =>{
    try{
      await saveMultipleItems('goals', goals);
      showMessage("Dashboard was updated successfully!", 'success');
      navigate('/dashboard')
    }catch(error){
      console.error(error)
      showMessage("There was an error saving your changes!", "error");
    }
  }

  
  return (
    <div className={styles.dashboardPage}>
      <AppHeader title={'Edit Dashboard'} button={<img onClick={handleSave} src={IconLibrary.Save} className='small-icon' alt='' />} />
      <div className={styles.dashboardContent}>
        {goals?.length > 0 ? goals.sort((a, b) => a.order - b.order).map((goal, index)=>goal.pinToDashboard === 'large' ? <LargeGoalPlaceholder goal={goal} button={<ChangeOrderButton moveDown={moveDown} moveUp={moveUp} id={goal._id} order={goal.order} length={goals.length} />} /> 
        : <SmallGoalPlaceholder goal={goal} button={<ChangeOrderButton moveDown={moveDown} moveUp={moveUp} id={goal._id} order={goal.order} length={goals.length} />} />) : null}
      </div>
    </div>
  );
};

export default DashboardLayout;


const ChangeOrderButton = ({moveUp, moveDown, id, order, length}) =>{
  return (
    <div className={styles.changeOrderButton}>
      <button disabled={order === 1} style={order === 1 ? {opacity: '0.3', transform: 'rotateZ(180deg)'} : {transform: 'rotateZ(180deg)'}} onClick={()=>moveUp(id)}><img src={IconLibrary.Arrow} alt='' /></button>
      <button disabled={order >= length} style={order === length ? {opacity: '0.3'} : {}}  onClick={()=>moveDown(id)}><img src={IconLibrary.Arrow} alt='' /></button>
    </div>
  )
}

// Large Goal placeholders
const LargeGoalPlaceholder = ({goal, button}) =>{

  const IconComponent = iconList.find(item => item.id === goal.icon)?.icon; // Find the icon based on the saved id
  return ( 
      <div className={styles.largeGoal}>
          <div className={styles.goalTop}>
              {IconComponent && <IconComponent fill={goal.color} width="20px" height="20px"/>}
              <h4 style={{color: goal.color}}>{goal.name}</h4>
              {button}
          </div>
          {goal.type === 'target' ? <TargetGoal goal={goal} /> : goal.type === 'number' ? <NumberGoal goal={goal} /> : goal.type === 'yes-no' ? <BooleanGoal goal={goal} /> : null}
      </div>
    );
}

const TargetGoal = ({goal}) =>{  
  return (
    <div className={styles.targetGoal}>
        <p><b style={{color: goal.color}}>0</b> / {goal.target} {goal.unit.shortLabel}</p>
        <div className={styles.daysContainer}>
          <ProgressCircle width={'40px'} height={'40px'} barColor={goal.color} backgroundColor={'var(--background)'} progress={0} />
          <ProgressCircle width={'40px'} height={'40px'} barColor={goal.color} backgroundColor={'var(--background)'} progress={0} />
          <ProgressCircle width={'40px'} height={'40px'} barColor={goal.color} backgroundColor={'var(--background)'} progress={0} />
          <ProgressCircle width={'40px'} height={'40px'} barColor={goal.color} backgroundColor={'var(--background)'} progress={0} />
          <ProgressCircle width={'40px'} height={'40px'} barColor={goal.color} backgroundColor={'var(--background)'} progress={0} />
        </div>
    </div>
  )
}

const NumberGoal = ({goal}) =>{
  return (
    <div className={styles.numberGoal}>
        <div className={styles.day} key={goal.name}>
            <div className={styles.bar} style={{backgroundColor: goal.color, height: `75%`}}></div>
            <div className={styles.value}>75</div>
            <div className={styles.date}>1</div>
        </div>
        <div className={styles.day} key={goal.name}>
            <div className={styles.bar} style={{backgroundColor: goal.color, height: `50%`}}></div>
            <div className={styles.value}>50</div>
            <div className={styles.date}>2</div>
        </div>
        <div className={styles.day} key={goal.name}>
            <div className={styles.bar} style={{backgroundColor: goal.color, height: `80%`}}></div>
            <div className={styles.value}>80</div>
            <div className={styles.date}>3</div>
        </div>
        <div className={styles.day} key={goal.name}>
            <div className={styles.bar} style={{backgroundColor: goal.color, height: `30%`}}></div>
            <div className={styles.value}>30</div>
            <div className={styles.date}>4</div>
        </div>
        <div className={styles.day} key={goal.name}>
            <div className={styles.bar} style={{backgroundColor: goal.color, height: `63%`}}></div>
            <div className={styles.value}>63</div>
            <div className={styles.date}>5</div>
        </div>
    </div>
  )
}


const BooleanGoal = ({ goal }) => {
  return (
    <div className={styles.booleanGoal}>
        <div className={styles.day}>
            <div className={styles.iconContainer}>
              <img className={styles.goalIcon} src={IconLibrary.Minus} alt='' />
            </div>
            <div className={styles.timestamp}>"Missed"</div>
        </div>
        <div className={styles.day}>
            <div className={styles.iconContainer}>
              <img className={styles.goalIcon} src={IconLibrary.Minus} alt='' />
            </div>
            <div className={styles.timestamp}>"Missed"</div>
        </div>
        <div className={styles.day}>
            <div className={styles.iconContainer}>
              <img className={styles.goalIcon} src={IconLibrary.Minus} alt='' />
            </div>
            <div className={styles.timestamp}>"Missed"</div>
        </div>
        <div className={styles.day}>
            <div className={styles.iconContainer}>
              <img className={styles.goalIcon} src={IconLibrary.Minus} alt='' />
            </div>
            <div className={styles.timestamp}>"Missed"</div>
        </div>
        <div className={styles.day}>
            <div className={styles.iconContainer}>
              <img className={styles.goalIcon} src={IconLibrary.Minus} alt='' />
            </div>
            <div className={styles.timestamp}>"Missed"</div>
        </div>
    </div>
  ); 
};

// Small Goal placeholders
const SmallGoalPlaceholder = ({goal, button}) => {
  const IconComponent = iconList.find(item => item.id === goal.icon)?.icon; // Find the icon based on the saved id
  return ( 
      <div className={styles.smallGoal}>
          <div className={styles.goalTop}>
              {IconComponent && <IconComponent fill={goal.color} width="20px" height="20px"/>}
              <h4 style={{color: goal.color}}>{goal.name}</h4>
              {button}
          </div>
          {goal.type === 'target' ? <SmallTargetGoal goal={goal} /> : goal.type === 'number' ? <SmallNumberGoal goal={goal} /> : goal.type === 'yes-no' ? <SmallBooleanGoal goal={goal} /> : null}
      </div>
    );
}


const SmallTargetGoal = ({goal}) =>{
  return (
    <div className={styles.targetGoal}>
        <p><b style={{color: goal.color}}>{goal.target/2}</b> / {goal.target} {goal.unit.shortLabel}</p>
        <div className={styles.progressCircle}>
            <ProgressBar value={goal.target/2} target={goal.target} color={goal.color} /> 
        </div>
    </div>
  )
}


const SmallNumberGoal = ({goal}) =>{
  return (<div className={styles.numberGoal}>
    <img className={styles.goalIcon} src={IconLibrary.ArrowUp} alt='' />
    <p style={{color: goal.color}}>{goal.target/2}</p>
  </div>)
}


const SmallBooleanGoal = ({ goal }) => {
  return (
    <div className={styles.booleanGoal}>
      <div className={styles.day} >
        <img className={styles.goalIcon} src={IconLibrary.Completed} alt='' />
      </div>
      <div className={styles.day} >
        <img className={styles.goalIcon} src={IconLibrary.NotCompleted} alt='' />
      </div>
      <div className={styles.day} >
        <img className={styles.goalIcon} src={IconLibrary.Completed} alt='' />
      </div>
    </div>
  );
};
