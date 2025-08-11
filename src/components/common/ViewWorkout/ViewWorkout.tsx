import { useState } from 'react';
import { IconLibrary } from '../../../IconLibrary';
import styles from './ViewWorkout.module.css'
import { formatDate, makeFirstUpperCase } from '../../../helpers';
import { useUI } from '../../../context/UIContext';
import { Link, useNavigate } from 'react-router-dom';
import { deleteItem } from '../../../db';


const ViewWorkout = ({data, close}) => {

    const {showConfirmationModal, showMessage} = useUI();
    const navigate = useNavigate();

    const [selectedCategory, setSelectedCategory] = useState('overview');

    const deleteWorkout = async () =>{
        await deleteItem('workouts', data._id)
        showMessage("Workout deleted successfully", 'confirm')
        navigate('/workouts-library');            
    }

    return ( 
        <div className={styles.viewWorkout}>
            <div className={styles.bg} />
            <div className={styles.content}>
                <div className={styles.header}>
                <h3>{data.name}</h3>
                <button onClick={close}>
                    <img src={IconLibrary.Close} alt='close workout view' />
                </button>
            </div>
            <div className={styles.exerciseInfo}>
                <div className={styles.switcher}>
                    <button className={`${styles.categoryBtn} ${selectedCategory === 'overview' ? styles.selectedCategoryBtn : ''}`} onClick={()=>setSelectedCategory('overview')}>Overview</button>
                    <button className={`${styles.categoryBtn} ${selectedCategory === 'exercises' ? styles.selectedCategoryBtn : ''}`} onClick={()=>setSelectedCategory('exercises')}>Exercises</button>
                    <button className={`${styles.categoryBtn} ${selectedCategory === 'history' ? styles.selectedCategoryBtn : ''}`} onClick={()=>setSelectedCategory('history')}>History</button>
                    <button className={`${styles.categoryBtn} ${selectedCategory === 'manage' ? styles.selectedCategoryBtn : ''}`} onClick={()=>setSelectedCategory('manage')}>Manage</button>
                </div>
                <div className={styles.currentCategory}>
                    {
                        selectedCategory === 'overview' ? <Overview data={data} /> :
                        selectedCategory === 'exercises' ? <Exercises data={data} /> :
                        <p>Not working yet</p> 
                    }
                </div>
            </div>
            <div className={styles.buttonsContainer}>
                <button className={styles.deleteBtn} onClick={()=>showConfirmationModal({title: 'Delete workout?', message: "Delete workout from your library? This cannot be undone", onConfirm: deleteWorkout})}>
                    <img src={IconLibrary.Delete} alt='delete workout' />
                </button>
                <button className={styles.editBtn}>
                    <img src={IconLibrary.Edit} alt='edit workout' />
                </button>
                <Link to={`/workout/${data._id}/start`} className={styles.startBtn}>Start</Link>
            </div>
            </div>
        </div>
     );
}
 
export default ViewWorkout;


const Overview = ({data}) =>{
    const categoryIconStyles = {backgroundColor: 'var(--background', width: '30px', height: '30px', borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center'};
    const convertDuration = (duration, unit) =>{
        if(unit === 'hours') return duration/3600;
        if(unit === "minutes") return duration/60;
        if(unit === "seconds") return duration;
        console.log('Invalid value', duration, unit)
    }
    return(
        <div className={styles.overview}>
            <div style={{width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center'}}>
                <p><b>Duration: </b>{convertDuration(data.duration, data.durationUnit) || 'Unset'} {data.durationUnit ?? ''}</p>
                <p><b>Rest: </b>{convertDuration(data.restDuration, data.restUnit) || 'Unset'} {data.restUnit ?? ''}</p>
            </div>
            <div style={{width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center'}}>
                <p><b>Created at: </b>{data.createdAt ? formatDate(data.createdAt) : 'Unset'}</p>
                <p><b>Updated at: </b>{data.updatedAt ? formatDate(data.updatedAt) : 'Unset'}</p>
            </div>
            <b>Difficulty: </b>
            <p>{makeFirstUpperCase(data.difficulty)}</p>
            <b>Description</b>
            <p>{data.description ?? 'No description was set'}</p>
            <b>Tags</b>
            <div className={styles.tags}>
                <div style={categoryIconStyles}><img src={IconLibrary.Tags} style={{width: '20px', height: '20px'}} alt='' /></div>
                {data?.tags && data.tags.length > 0 ? data.tags.map((tag, index)=><div className={styles.tagBody} key={'tag'+index}><div className={styles.tagColor} style={{backgroundColor: tag.color}} /><p>{tag.name}</p></div>) : <p className={styles.tagBody}>No tags added</p>}
            </div>
            <b>Targeted Muscles</b>
            <div className={styles.muscles}>
                <div style={categoryIconStyles}><img src={IconLibrary.Muscle} style={{width: '20px', height: '20px'}} alt='' /></div>
                {data?.targetMuscles && data.targetMuscles.length > 0 ? data.targetMuscles.map((muscle, index)=><div className={styles.muscleBody} key={'muscle'+index}><p>{muscle.name}</p></div>) : <p className={styles.muscleBody}>No muscles added</p>}
            </div>
            <b>Values</b>
            <div className={styles.fields}>
                <div style={categoryIconStyles}><img src={IconLibrary.Fields} style={{width: '20px', height: '20px'}} alt='' /></div>
                {data?.fields && data.fields.length > 0 ? data.fields.map((field, index)=><div className={styles.fieldBody} key={'muscle'+index}><p>{field.name}</p><div className={styles.fieldBar} /><p>{field.target ?? ''} {field.unit.shortLabel ?? ""}</p></div>) : <p className={styles.fieldBody}>No fields added</p>}
            </div>
            <b>Equipment</b>
            <div className={styles.equipmentContainer}>
                <div style={categoryIconStyles}><img src={IconLibrary.Equipment} style={{width: '20px', height: '20px'}} alt='' /></div>
                {data?.equipment && data.equipment.length > 0 ? data.equipment.map(item=><EquipmentItem data={item} />) : <p className={styles.equipmentItem}>No equipment</p>}
            </div>

        </div>
    )
}


const EquipmentItem = ({data}) =>{
    return(
        <div className={styles.equipmentItem} key={data._id ?? Math.random()}>
            <p>{data.name}</p>
            <div className={styles.bar} />
            <div className={styles.equipmenAttr}>
                {data.attributes && data.attributes.length > 0 ? data.attributes.map((item, index)=><p key={'attr-'+index}>{item.value ?? ''} {item?.unit?.shortLabel ?? ''}</p>) : null}
            </div>
        </div>
    )
}

const Exercises = ({data}) =>{
    return (
        <div className={styles.exercises}>
            <b>Notes</b>
            <p>{data.notes}</p>
            <b>Reference URL</b>
            <p>{data.reference || 'No reference URL set'}</p>
            <b>Exercises</b>
            <div className={styles.exercisesContainer}>
                {data && data.phases && data.phases.length > 0 ? data.phases.map((phase, index)=><div className={styles.phase} key={'phase-'+index}>
                    <div className={styles.phaseHeader}>
                        <h4>{phase.name}</h4>
                        <div className={styles.phaseMeta}>
                            <img style={{width: '15px', height: '15px'}} src={IconLibrary.Time} alt='' />
                            <p>{phase.exercises && phase.exercises.length > 0 ? `${phase.exercises.reduce((sum, item)=>sum + item.duration, 0)/60} min` : 'Unset'}</p>
                        </div>
                        <div className={styles.phaseMeta}>
                            <img style={{width: '15px', height: '15px'}} src={IconLibrary.Exercise} alt='' />
                            <p>{phase.exercises ? phase.exercises.length : 'Unset'}</p>
                        </div>
                    </div>
                    <div className={styles.phaseExercises}>
                        {phase.exercises && phase.exercises.length > 0 ? phase.exercises.map((ex, index)=><div key={index+'ex'} className={styles.exercise}>
                            <p>{ex.name}</p>
                            <div className={styles.exerciseFields}>
                                {ex.fields && ex.fields.length > 0 ? ex.fields.map((field, index)=><p key={`${index}-field-${field.name}`}>{field.target ?? ''} {field.unit?.shortLabel ?? ''}</p>) : ''}
                            </div>
                        </div>) : <p>No exercises</p>}
                    </div>
                </div>):  <p>No exercises added</p>}
            </div>
        </div>
    )
}