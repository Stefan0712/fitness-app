import { useEffect, useState } from 'react';
import { IconLibrary } from '../../../IconLibrary';
import { Set } from '../../common/interfaces';
import styles from './ExerciseSet.module.css';


interface ExerciseSetProps{
    set: Set,
    setIndex: number;
    currentSet: string | null;
    setCurrentSet: (setId: string) => void;
    allSets: Set[],
    setExerciseData: React.Dispatch<React.SetStateAction<any>>;
}
const ExerciseSet: React.FC<ExerciseSetProps> = ({set, setIndex, setExerciseData}) => {

    const [seconds, setSeconds] = useState(set.duration || 0);

    
    useEffect(() => {
        if (set.isCompleted && set.status !== 'completed') {
            updateSetMetadata(setIndex, {finishedAt: new Date(), duration: seconds, status: 'completed'});
            // Check if this is the last uncompleted set in the exercise
            setExerciseData(prevEx => {
                    const updatedSets = prevEx.sets.map((s, idx) => {
                        if (idx === setIndex) return { ...s, finishedAt: new Date(), duration: seconds, status: 'completed' as const};
                        return s;
                    });
                    const allSetsCompleted = updatedSets.every(s => s.isCompleted);
                    const updatedExercise = { ...prevEx, sets: updatedSets, isCompleted: allSetsCompleted };
                    // Only call next set/exercise if all are done
                    
                    return updatedExercise;
            });
            setSeconds(0);
        }
    }, [set]);


    useEffect(()=>{
        updateSetMetadata(setIndex, {startedAt: new Date()});
    },[]);

    // Handle completing one field
    const toggleFieldCompletion = ( setIndex: number, fieldId: string, checked: boolean ) => {
        setExerciseData(prevEx =>{
            const updatedSets = prevEx.sets.map((set, idx) => {
                if (idx !== setIndex) return set; // Ignore sets that doesn't match the provided index
                const updatedFields = set.fields.map(field => {
                    if (field._id !== fieldId) return field; // Ignores fields that doesn't match the provided id
                    return {...field, isCompleted: checked, value: checked ? parseInt(field.target.toString()) : 0}; // Sets the field's isCompleted to the value of the checkbox and either resets the current value or sets it to target
                });
                const isSetCompleted = updatedFields.every(f => f.isCompleted); // Checks if all fields are completed
                const status: 'not-started' | 'idle' | 'running' | 'paused' | 'completed' | 'skipped' = isSetCompleted ? 'completed' : 'not-started';
                return {...set, fields: updatedFields, isCompleted: isSetCompleted, status}; // Returns the updated fields and updated the isCompleted for the selected set if all fields are completed
            });
            const isExerciseCompleted = updatedSets.every(s => s.isCompleted); // Checks if all sets are completed to move to the next exercise
            return {...prevEx, sets: updatedSets, isCompleted: isExerciseCompleted};
        })
    };
    

    const updateFieldValue = (setIndex: number, fieldId: string, value: number) => {
        setExerciseData(prevEx => {
            const updatedSets = prevEx.sets.map((set, idx) => {
                if (idx !== setIndex) return set;
                const updatedFields = set.fields.map(field => {
                    if (field._id !== fieldId) return field;

                    const newValue = Math.max(0, value);
                    const isCompleted = newValue >= parseInt(field.target.toString());
                    return {...field, value: newValue, isCompleted};
                });
                const isSetCompleted = updatedFields.every(f => f.isCompleted);
                return {...set, fields: updatedFields, isCompleted: isSetCompleted,};
            });
            const isExerciseCompleted = updatedSets.every(s => s.isCompleted);
            return {...prevEx, sets: updatedSets, isCompleted: isExerciseCompleted};
        });
    };

    const updateSetMetadata = (setIndex: number, updates: {startedAt?: Date; finishedAt?: Date; duration?: number; status?: 'not-started' | 'idle' | 'running' | 'paused' | 'completed' | 'skipped';}) => {
        setExerciseData(prevEx =>{
            const updatedSets = prevEx.sets.map((set, idx) => {
                if (idx !== setIndex) return set;
                return {...set, ...updates};
            });
            return {...prevEx, sets: updatedSets};
        });
    };
    const toggleSetCompletion = () => {
        setExerciseData(prevEx =>{
            const updatedSets = prevEx.sets.map(s => {
                if (s._id !== set._id) return s;
                const newCompletion = !s.isCompleted;
                const newStatus: Set['status'] = newCompletion ? 'completed' : 'not-started';
                const updatedFields = s.fields.map(field => newCompletion
                ? { ...field, value: newCompletion ? field.target : 0, isCompleted: true }
                : { ...field, value: 0, isCompleted: false }
                );
                return { ...s, isCompleted: newCompletion, status: newStatus, fields: updatedFields };
            });
            const isExerciseCompleted = updatedSets.every(s => s.isCompleted);
            return { ...prevEx, sets: updatedSets, isCompleted: isExerciseCompleted };
        });
    };

    return ( 
        <div className={styles.exerciseSet}>
            <div className={styles.setHeader}>
                <button onClick={toggleSetCompletion} className={styles.setCompletionButton}><img src={set.isCompleted ? IconLibrary.CircleCheckmark : IconLibrary.Circle} alt='' /></button>
                <h3>Set {setIndex+1}</h3>
            </div>
            <div className={styles.setFields}>
                {set.fields && set.fields.length > 0 ? set.fields.map((field, index)=><div className={styles.setField} key={`set-${set._id}-field-${index}`}>
                    <p>{field.name}</p>
                    <div className={styles.inputSet}>
                        <input type='text' min={0} max={9999} className={styles.fieldInput} value={field.value || 0}
                            onChange={(e)=>updateFieldValue(setIndex, field._id, parseInt(e.target.value))}
                        />
                        <p className={styles.fieldTarget}> / {field.target}</p>
                    </div>
                    <button onClick={()=>toggleFieldCompletion(setIndex, field._id, !field.isCompleted)} className={styles.fieldCheckbox} >
                        <img src={field.isCompleted ? IconLibrary.CircleCheckmark : IconLibrary.Circle} alt='' />
                    </button>
                </div>) : <p>No fields</p>}
            </div>
        </div>
     );
}
 
export default ExerciseSet;
