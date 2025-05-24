import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { formatDate, getDateForHeader, makeFirstUpperCase } from "../../../../helpers.js";
import { IconLibrary } from "../../../../IconLibrary.js";
import {v4 as uuidv4} from 'uuid';
import { useEffect, useState } from "react";
import axios from "axios";
import { deleteItem, getItemById, saveItem } from "../../../../db.js";
import AppHeader from "../../../common/AppHeader/AppHeader.tsx";
import styles from './ViewExercise.module.css';
import { useUI } from "../../../../context/UIContext.jsx";



const ViewExercise = () => {

    const {id} = useParams();
    const userId = localStorage.getItem('userId');
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const type = query.get('type');
    const {showConfirmationModal, showMessage} = useUI();

    const navigate = useNavigate();
    
    const [exerciseData, setExerciseData] = useState(null);

    
    const fetchExercise = async () =>{
        try{
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/exercise/view/${id}`,{ withCredentials: true });
            if(response.data){
                setExerciseData(response.data);
                console.log(response.data)
            }
        }catch(error){
            console.error(error);
            showMessage('Server error', 'error')

        }
    }
    useEffect(()=>{
        if(type && type === 'online'){
            fetchExercise();
        }else if(type === 'cached'){
            getExerciseFromDb('cachedExercises');
            showMessage("This is a cached exercise");
        }
        else{
            getExerciseFromDb('exercises');
        }
    },[]);

    const getExerciseFromDb = async (source) =>{
            const exercise = await getItemById(source, id);
            setExerciseData(exercise);
        }
    const deleteEx = async () =>{
        if(type !== 'online' || exerciseData.author._id === userId){
            await deleteItem('exercises', exerciseData._id)
            navigate('/library');
        }
           
    }

    const handleSaveExercise = async () =>{
        if(type === 'online'){
            await saveItem('exercises', {...exerciseData, sourceId: exerciseData._id, _id: uuidv4()})
            navigate('/library');
            showMessage("Exercise saved to library", 'success')
        }
    }
    if(exerciseData){
        return ( 
            <div className={styles.viewExercise}>
                <AppHeader title={exerciseData.name} button={type !== 'online' && type !== 'cached' ? <Link to={`/exercise/${exerciseData._id}/start`} className={styles.startButton}>Start</Link> : <button onClick={handleSaveExercise} className={styles.startButton}>Save</button>} />
                <div className={styles.content}>
                    <div className={styles.twoBlocks}>
                        <div className={styles.half}>
                            <b>Created at</b>
                            <p>{exerciseData.createdAt ? formatDate(exerciseData.createdAt) : 'Unset'}</p>
                        </div>
                        <div className={styles.half}>
                            <b>UpdatedAt</b>
                            <p>{exerciseData.updatedAt ? formatDate(exerciseData.updatedAt) : 'Unset'}</p>
                        </div>
                    </div>
                    <div className={styles.twoBlocks}>
                        <div className={styles.half}>
                            <b>Duration</b>
                            <p>{exerciseData.duration || 'Unset'} {exerciseData.duration ? exerciseData.durationUnit : ''}</p>
                        </div>
                        <div className={styles.half}>
                            <b>Rest</b>
                            <p>{exerciseData.rest || 'Unset'} {exerciseData.rest ? exerciseData.restUnit : ''}</p>
                        </div>
                    </div>
                    <div className={styles.twoBlocks}>
                        <div className={styles.half}>
                            <b>Difficulty</b>
                            <p>{makeFirstUpperCase(exerciseData.difficulty) || 'Unset'}</p>
                        </div>
                        <div className={styles.half}>
                            <b>Reference (url)</b>
                            <p>{exerciseData.reference || 'Unset'}</p>
                        </div>
                    </div>
                    <div className={styles.block}>
                        <b>Description</b>
                        <p>{exerciseData.description || 'Unset'}</p>
                    </div>
                    <div className={styles.block}>
                        <b>Notes</b>
                        <p>{exerciseData.notes && exerciseData.notes.length > 0 ? exerciseData.notes : 'Unset'}</p>
                    </div>
                    <div className={styles.block}>
                        <div className={styles.blockHeader}>
                            <img className={styles.blockIcon} src={IconLibrary.Tag} alt=''></img>
                            <p>Tags</p>
                        </div>
                        <div className={styles.tags}>
                            {exerciseData.tags?.length > 0 ? exerciseData.tags.map(tag=>(
                                <div className={styles.tag} key={tag.name}>
                                    <div className={styles.tagColor} style={{backgroundColor: tag.color}}></div>
                                    <p>{tag.name}</p>
                                </div>
                            )) : <p>No tags</p>}
                        </div>
                    </div>
                    <div className={styles.block}>
                        <div className={styles.blockHeader}>
                            <img className={styles.blockIcon} src={IconLibrary.Dumbbell} alt=''></img>
                            <p>Equipment</p>
                        </div>
                        <div className={styles.equipments}
                        >{exerciseData.equipment?.length > 0 ? exerciseData.equipment.map((eq)=>(
                            <div className={styles.equipment} key={eq.name}>
                                <p>{eq.name}</p>
                            </div>
                            )) : <p>No equipment needed</p>}</div>
                    </div>
                    <div className={styles.block}>
                        <div className={styles.blockHeader}>
                            <img className={styles.blockIcon} src={IconLibrary.Muscle} alt=''></img>
                            <p>Target Muscles</p>
                        </div>
                        <div className={styles.muscles}>
                            {exerciseData.targetMuscles?.length > 0 ? exerciseData.targetMuscles.map(group => <div className={styles.muscle}>{group.name}</div>) : <p>No target muscles provided</p>}
                        </div>
                    </div>
                    <div className={styles.block}>
                        <div className={styles.blockHeader}>
                            <img className={styles.blockIcon} src={IconLibrary.List} alt=''></img>
                            <p>Fields</p>
                        </div>
                        <div className={styles.fields}>
                            {exerciseData && exerciseData.fields && exerciseData.fields.length > 0 ? exerciseData.fields.map((fields, index)=>(
                                <div className={styles.field} key={'field'+index}>
                                    <b>{fields.name}</b>
                                    <p>{fields.target}</p>
                                    <p>{fields.unit}</p>
                                </div>
                            )) : <p>No fields</p>}
                        </div>
                    </div>
                    <div className={styles.block}>
                        <div className={styles.blockHeader}>
                            <p>Instructions</p>
                        </div>
                        <div className={styles.instructions}>
                            {exerciseData.instructions?.length > 0 ? exerciseData.instructions.map((step, index) => (<p key={'step-'+index}>{index+1}. {step}</p>)) : 'None'}
                        </div>
                    </div>
                    {(userId === exerciseData.author._id) || type !=='online' ? 
                        <div className={styles.bottomButtons}>
                            <button className={styles.exerciseButton} onClick={()=>showConfirmationModal({title: 'Delete exercise?', message: "This will delete exercise from your library and cannot be undone", onConfirm: deleteEx})}>Delete</button>
                            <Link className={styles.exerciseButton} to={`/exercise/${exerciseData.id}/edit`}>Edit</Link> 
                        </div> 
                    : null}
                </div>
                 
                
            </div>
         );
    }else{
        return(
            <div className="page exercise-page">
                <div className="header">
                    <div className="date">{getDateForHeader()}</div>
                    <h2>Exercise loading</h2>
                </div>
                <h1>Loading...</h1>
            </div>
        )
    }
}
 
export default ViewExercise;