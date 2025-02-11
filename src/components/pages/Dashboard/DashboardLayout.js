import { getDateForHeader, makeFirstUpperCase } from '../../../helpers';
import styles from './Dashboard.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { updateDashboardLayout } from '../../../store/userSlice';
import { IconLibrary } from '../../../IconLibrary';
import { useNavigate } from 'react-router-dom';

const DashboardLayout = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const goals = useSelector((state) => state.user.userData.goals);
  const enabledComponents = useSelector((state) => state.user.dashboardSections);
  const [orderedComponents, setOrderedComponents] = useState(enabledComponents || []);

  const allSections = [
    { name: 'Activity', type: 'section', identifier: 'activity' },
    { name: 'Nutrition', type: 'section', identifier: 'nutrition' },
  ];

  // Show Component
  const showComponent = (item) => {
    setOrderedComponents((orderedComponents)=>[...orderedComponents, item])
  };
  const showGoal = (goal) =>{
    setOrderedComponents(orderedComponents=>[
        ...orderedComponents,
        {
            type: 'goal',
            order: orderedComponents.length + 1,
            identifier: goal.id
        }
    ]);
  }
  // Move Up Function
  const moveUp = (identifier) => {
    const index = orderedComponents.findIndex((obj) => obj.identifier === identifier);
    if (index > 0) {
      // Swap the item with the one above it
      const newOrderedComponents = [...orderedComponents];
      [newOrderedComponents[index], newOrderedComponents[index - 1]] = [
        newOrderedComponents[index - 1],
        newOrderedComponents[index],
      ];

      // Update the state with the new order
      setOrderedComponents(newOrderedComponents);
    }
  };

  // Move Down Function
  const moveDown = (identifier) => {
    const index = orderedComponents.findIndex((obj) => obj.identifier === identifier);
    if (index < orderedComponents.length - 1) {
      // Swap the item with the one below it
      const newOrderedComponents = [...orderedComponents];
      [newOrderedComponents[index], newOrderedComponents[index + 1]] = [
        newOrderedComponents[index + 1],
        newOrderedComponents[index],
      ];

      // Update the state with the new order
      setOrderedComponents(newOrderedComponents);
    }
  };
  const handleSave = () =>{
    dispatch(updateDashboardLayout(orderedComponents));
    navigate('/dashboard');
  }
  const removeComponent = (identifier) =>{
    setOrderedComponents((orderedComponents)=>[...orderedComponents.filter(item=>item.identifier!==identifier)]);
  }
  return (
    <div className={`${styles['dashboard-layout']} page`}>
      <div className={styles.header}>
        <div className={styles.date}>{getDateForHeader()}</div>
        <h2>Edit Dashboard</h2>
        <button type='button' className='orange-button' onClick={handleSave}>Save</button>
      </div>
      <h2>Enabled Components</h2>
      <div className={styles['enabled-components']}>
        {orderedComponents?.map((item) => (
          <div className={styles['component']} key={item.identifier}>
            <div className={styles['order-buttons']}>
              <button className="clear-button" onClick={() => moveUp(item.identifier)}>
                <img
                  src={IconLibrary.Arrow}
                  style={{ transform: 'rotateZ(270deg)' }}
                  className="small-icon"
                  alt=""
                />
              </button>
              <button className="clear-button" onClick={() => moveDown(item.identifier)}>
                <img
                  src={IconLibrary.Arrow}
                  style={{ transform: 'rotateZ(90deg)' }}
                  className="small-icon"
                  alt=""
                />
              </button>
            </div>
            <p>{goals?.find((i) => i.id === item.identifier)?.name || allSections?.find((i) => i.identifier === item.identifier)?.name}</p>
            <button className="clear-button" onClick={()=>removeComponent(item.identifier)}>
              <img src={IconLibrary.Close} className="small-icon" alt="" />
            </button>
          </div>
        ))}
      </div>
      <h2>Disabled Components</h2>
      <div className={styles['disabled-components']}>
        {goals?.filter((goal) => !orderedComponents.some((i) => i.identifier === goal.id)).map((item) => (
          <div className={styles['component']} key={item.id}>
            <p>{item.name}</p>
            <button className="clear-button" onClick={()=>showGoal(item)}>
              <img src={IconLibrary.Add} className="small-icon" alt="" />
            </button>
          </div>
        ))}
        {allSections?.filter((section) => !orderedComponents.some((i) => i.identifier === section.identifier)).map((item) => (
          <div className={styles['component']} key={item.identifier}>
            <p>{makeFirstUpperCase(item.identifier)}</p>
            <button className="clear-button" onClick={()=>showComponent(item)}>
              <img src={IconLibrary.Add} className="small-icon" alt="" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardLayout;
