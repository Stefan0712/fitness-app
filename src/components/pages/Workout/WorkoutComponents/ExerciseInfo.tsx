import { useState } from 'react';
import styles from './ExerciseInfo.module.css';
import { IconLibrary } from '../../../../IconLibrary';


const ExerciseInfo = ({data, close, exercises, enabled, setEnabled}) => {

    const [selectedScreen, setSelectedScreen] = useState('instructions');
    if(data){
        return ( 
            <div className={`${styles.workoutInfo} ${enabled ? styles.expandedInfo : ''}`}>
                <div className={styles.header} onClick={!enabled ? ()=>setEnabled(true) : null}>
                    {exercises ? <>
                        <h3>{data?.name ?? "Exercise name"}</h3>
                        <b>{exercises.findIndex(item => item._id === data._id) + 1}/{exercises.length}</b> 
                    </> : <h3>{data.name}</h3>}
                    {enabled ? <button onClick={close} className={styles.closeButton}><img className='small-icon' alt='' src={IconLibrary.Close}/></button> : null}
                </div>
                <div className={styles.content}>
                    {selectedScreen === "instructions" ? <InstructionsScreen data={data} /> :
                    selectedScreen === "tags" ? <TagsScreen tags={data.tags} /> :
                    selectedScreen === "muscles" ? <MusclesScreen muscles={data.targetMuscles} /> :
                    selectedScreen === 'equipment' ? <EquipmentScreen equipment={data.equipment} /> : null}
                </div>
                <div className={styles.switcherContainer}>
                    <button className={selectedScreen === 'instructions' ? styles.selectedButton : ''} onClick={()=>setSelectedScreen('instructions')}>Instructions</button>
                    <button className={selectedScreen === 'equipment' ? styles.selectedButton : ''} onClick={()=>setSelectedScreen('equipment')}>Equipment</button>
                    <button className={selectedScreen === 'tags' ? styles.selectedButton : ''} onClick={()=>setSelectedScreen('tags')}>Tags</button>
                    <button className={selectedScreen === 'muscles' ? styles.selectedButton : ''} onClick={()=>setSelectedScreen('muscles')}>Muscles</button>
                </div>
            </div>
        );
    }
}
 
export default ExerciseInfo;


const InstructionsScreen = ({data}) =>{
    return(
        <div className={styles.instructionsScreen}>
            <fieldset>
                <label>Description</label>
                <p>{data.description ?? 'No description'}</p>
            </fieldset>
            <fieldset>
                <label>Notes</label>
                <p>{data.notes ?? 'No notes'}</p>
            </fieldset>
            <fieldset>
                <label>Refference URL</label>
                {data.refference ? <a href={data.refference}>Link</a> : <p>No URL</p>}
            </fieldset>
            <label>Instructions</label>
            <div className={styles.instructionsContainer}>
                {data.instructions && data.instructions.length > 0 ? data.instructions.map((item, index)=><p key={index+'instruction'}>{item}</p>) : <p>No instructions</p>}
            </div>
        </div>
    )
}

const EquipmentScreen = ({equipment}) =>{
    return(
        <div className={styles.equipmentScreen}>
            {equipment && equipment.length > 0 ? equipment.map((eq, index)=><div className={styles.equipmentBody} key={"Equipment-"+index}>
                <h4>{eq.name}</h4>
                <div className={styles.equipmentAttributes}>
                    {eq.attributes && eq.attributes.length > 0 ? eq.attributes.map((attr, index)=><p key={"Attr-"+index}>{attr.name ?? ''} {attr.unit?.shortLabel} ?? ''</p>): <p>No attributes</p>}
                </div>
            </div>) : <p>No Equipment</p>}
        </div>
    )
}
const TagsScreen = ({tags}) =>{
    return(
        <div className={styles.tagsScreen}>
            {tags && tags.length > 0 ? tags.map((tag, index)=><div className={styles.tagBody} key={"Tag-"+index}>
                <div className={styles.tagColor} style={{backgroundColor: tag.color}} />
                <h4>{tag.name}</h4>
            </div>) : <p>No tags</p>}
        </div>
    )
}


const MusclesScreen = ({muscles}) =>{
    return(
        <div className={styles.musclesScreen}>
            {muscles && muscles.length > 0 ? muscles.map((muscle, index)=><div className={styles.muscleBody} key={"Muscle-"+index}>
                <h4>{muscle.name}</h4>
            </div>) : <p>No muscles</p>}
        </div>
    )
}
