import { useState } from 'react';
import { IconLibrary } from '../../../IconLibrary';
import styles from './ViewExercise.module.css'
import { formatDate, makeFirstUpperCase } from '../../../helpers';
import { useUI } from '../../../context/UIContext';
import { Link, useNavigate } from 'react-router-dom';
import { deleteItem } from '../../../db';


const ViewExercise = ({data, close}) => {

    const {showConfirmationModal, showMessage} = useUI();
    const navigate = useNavigate();

    const [selectedCategory, setSelectedCategory] = useState('overview');

    const deleteExercise = async () =>{
        await deleteItem('exercises', data._id);
        showMessage("Exercise deleted successfully!", "success");
        navigate('/exercises-library');
        close();
    }


    return ( 
        <div className={styles.viewExercise}>
            <div className={styles.bg} />
            <div className={styles.content}>
                <div className={styles.header}>
                <h3>{data.name}</h3>
                <button onClick={close}>
                    <img src={IconLibrary.Close} alt='close exercise view' />
                </button>
            </div>
            <div className={styles.exerciseInfo}>
                <div className={styles.switcher}>
                    <button className={`${styles.categoryBtn} ${selectedCategory === 'overview' ? styles.selectedCategoryBtn : ''}`} onClick={()=>setSelectedCategory('overview')}>Overview</button>
                    <button className={`${styles.categoryBtn} ${selectedCategory === 'instructions' ? styles.selectedCategoryBtn : ''}`} onClick={()=>setSelectedCategory('instructions')}>Instructions</button>
                    <button className={`${styles.categoryBtn} ${selectedCategory === 'history' ? styles.selectedCategoryBtn : ''}`} onClick={()=>setSelectedCategory('history')}>History</button>
                    <button className={`${styles.categoryBtn} ${selectedCategory === 'manage' ? styles.selectedCategoryBtn : ''}`} onClick={()=>setSelectedCategory('manage')}>Manage</button>
                </div>
                <div className={styles.currentCategory}>
                    {
                        selectedCategory === 'overview' ? <Overview data={data} /> :
                        selectedCategory === 'instructions' ? <Instructions data={data} /> :
                        <p>Not working yet</p> 
                    }
                </div>
            </div>
            <div className={styles.buttonsContainer}>
                <button className={styles.deleteBtn} onClick={()=>showConfirmationModal({title: 'Delete exercise?', message: "This will delete exercise from your library and cannot be undone", onConfirm: deleteExercise})}>
                    <img src={IconLibrary.Delete} alt='delete exercise' />
                </button>
                <Link className={styles.editBtn} to={`/exercise/${data._id}/edit`}><img src={IconLibrary.Edit} alt='edit exercise' /></Link> 
                <Link to={`/exercise/${data._id}/start`} className={styles.startBtn}>Start</Link>
            </div>
            </div>
        </div>
     );
}
 
export default ViewExercise;


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

const Instructions = ({data}) =>{
    return (
        <div className={styles.instructions}>
            <b>Notes</b>
            <p>{data.notes}</p>
            <b>Reference URL</b>
            <p>{data.reference || 'No reference URL set'}</p>
            <b>Instructions</b>
            <div className={styles.instructionsContainer}>
                {data && data.instructions && data.instructions.length > 0 ? data.instructions.map((item, index)=><div className={styles.instruction} key={'instruction-'+index}><b>{index+1}</b><p>{item}</p></div>):  <p>No instructions provided</p>}
            </div>
        </div>
    )
}