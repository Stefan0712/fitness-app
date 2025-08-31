import { useEffect, useState } from 'react';
import { IconLibrary } from '../../../../IconLibrary';
import { Field, Set } from '../../../common/interfaces';
import styles from './WorkoutSet.module.css';

interface IExercise {
    _id: string,
    sourceId: string,
    name: string,
    sets: Set[],
    rest: number,
    fields: Field[],
    instructions: string[],
    isCompleted: boolean,
}

interface WorkoutSetProps{
    set: Set,
    setIndex: number;
    currentSet: string | null;
    setCurrentSet: (setId: string) => void;
    setExercises: React.Dispatch<React.SetStateAction<IExercise[]>>;
    allSets: Set[],
}
const WorkoutSet: React.FC<WorkoutSetProps> = ({set, setIndex, setExercises}) => {

    const [seconds, setSeconds] = useState(set.duration || 0);

    
    useEffect(() => {
        if (set.isCompleted && set.status !== 'completed') {
            updateSetMetadata(set.exerciseId, setIndex, {finishedAt: new Date(), duration: seconds, status: 'completed'});
            // Check if this is the last uncompleted set in the exercise
            setExercises(prevExercises => {
                return prevExercises.map(exercise => {
                    if (exercise._id !== set.exerciseId) return exercise;
                    const updatedSets = exercise.sets.map((s, idx) => {
                        if (idx === setIndex) return { ...s, finishedAt: new Date(), duration: seconds, status: 'completed' as const};
                        return s;
                    });
                    const allSetsCompleted = updatedSets.every(s => s.isCompleted);
                    const updatedExercise = { ...exercise, sets: updatedSets, isCompleted: allSetsCompleted };
                    // Only call next set/exercise if all are done
                    
                    return updatedExercise;
                });
            });
            setSeconds(0);
        }
    }, [set]);


    useEffect(()=>{
        updateSetMetadata(set.exerciseId, setIndex, {startedAt: new Date()});
    },[]);

    // Handle completing one field
    const toggleFieldCompletion = ( exerciseId: string, setIndex: number, fieldId: string, checked: boolean ) => {
        setExercises(prevExercises =>
            prevExercises.map(exercise => { // Goes over all exercises
                if (exercise._id !== exerciseId) return exercise; // Exit the function if no exercise is found
                const updatedSets = exercise.sets.map((set, idx) => {
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
                return {...exercise, sets: updatedSets, isCompleted: isExerciseCompleted};
            })
        );
    };
    

    const updateFieldValue = (exerciseId: string, setIndex: number, fieldId: string, value: number) => {
        setExercises(prevExercises => {
            return prevExercises.map(exercise => {
                if (exercise._id !== exerciseId) return exercise;
                const updatedSets = exercise.sets.map((set, idx) => {
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
                return {...exercise, sets: updatedSets, isCompleted: isExerciseCompleted};
            });
        });
    };

    const updateSetMetadata = (exerciseId: string, setIndex: number, updates: {startedAt?: Date; finishedAt?: Date; duration?: number; status?: 'not-started' | 'idle' | 'running' | 'paused' | 'completed' | 'skipped';}) => {
        setExercises(prevExercises => prevExercises.map(exercise => {
            if (exercise._id !== exerciseId) return exercise;
                const updatedSets = exercise.sets.map((set, idx) => {
                    if (idx !== setIndex) return set;
                    return {...set, ...updates};
                });
                return {...exercise,sets: updatedSets};
            })
        );
    };
    const toggleSetCompletion = () => {
        setExercises(prevExercises =>
            prevExercises.map(exercise => {
            if (exercise._id !== set.exerciseId) return exercise;
            const updatedSets = exercise.sets.map(s => {
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
                return { ...exercise, sets: updatedSets, isCompleted: isExerciseCompleted };
            })
        );
    };

    return ( 
        <div className={styles.workoutSet}>
            <div className={styles.setHeader}>
                <button onClick={toggleSetCompletion} className={styles.setCompletionButton}><img src={set.isCompleted ? IconLibrary.CircleCheckmark : IconLibrary.Circle} alt='' /></button>
                <h3>Set {setIndex+1}</h3>
            </div>
            <div className={styles.setFields}>
                {set.fields && set.fields.length > 0 ? set.fields.map((field, index)=><div className={styles.setField} key={`set-${set._id}-field-${index}`}>
                    <p>{field.name}</p>
                    <div className={styles.inputSet}>
                        <input type='text' min={0} max={9999} className={styles.fieldInput} value={field.value || 0}
                            onChange={(e)=>updateFieldValue(set.exerciseId, setIndex, field._id, parseInt(e.target.value))}
                        />
                        <p className={styles.fieldTarget}> / {field.target}</p>
                    </div>
                    <button onClick={()=>toggleFieldCompletion(set.exerciseId, setIndex, field._id, !field.isCompleted)} className={styles.fieldCheckbox} >
                        <img src={field.isCompleted ? IconLibrary.CircleCheckmark : IconLibrary.Circle} alt='' />
                    </button>
                </div>) : <p>No fields</p>}
            </div>
        </div>
     );
}
 
export default WorkoutSet;
