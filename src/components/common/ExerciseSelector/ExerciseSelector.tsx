import React, { useEffect, useState } from 'react';
import styles from './ExerciseSelector.module.css';
import { getAllItems } from '../../../db';
import { IconLibrary } from '../../../IconLibrary';
import { WorkoutExercise } from '../interfaces';
import axios from 'axios';


type SourceType = 'library' | 'online';

interface ExerciseSelectorProps {
    addExercise: (exercise: WorkoutExercise) => void;
    close: () => void;
}
const ExerciseSelector: React.FC<ExerciseSelectorProps> = ({addExercise, close}) => {


    const [source, setSource] = useState<SourceType>('library');
    const [search, setSearch] = useState('');
    const [exercises, setExercises] = useState<WorkoutExercise[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchExercises = async () => {
            setLoading(true);
            try {
                if (source === 'library') {
                    const items = await getAllItems('exercises');
                    setExercises(items || []);
                } else {
                    const res = await axios.get(`${process.env.REACT_APP_API_URL}/exercise/`,{ withCredentials: true });
                    setExercises(res.data || []);
                }
            } catch (e) {
                setExercises([]);
            }
            setLoading(false);
        };
        fetchExercises();
    }, [source]);

    const filteredExercises = exercises.filter(ex =>
        ex.name.toLowerCase().includes(search.toLowerCase()) ||
        ex.tags.some(tag => tag.name.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <div className={styles['exercise-selector']}>
            <div className={styles['source-switch']}>
                <button type='button' className={`${styles['switch-btn']} ${source === 'library' ? styles['active'] : ''}`} onClick={() => setSource('library')}>Library</button>
                <button type='button' className={`${styles['switch-btn']} ${source === 'online' ? styles['active'] : ''}`} onClick={() => setSource('online')}>Online</button>
            </div>
            <input className={styles['search-bar']} type="text" placeholder="Search exercises..." value={search} onChange={e => setSearch(e.target.value)}/>
            <div className={styles['exercise-list']}>
                {loading ? (
                    <div className={styles['loading']}>Loading...</div>
                ) : (
                    filteredExercises.map((ex, index) => (
                        <ExerciseBody addExercise={addExercise} exercise={ex} index={index} />
                    ))
                )}
            </div>
            <button className={styles['close-btn']} onClick={close} type='button'> Cancel </button>
        </div>
    );
};

export default ExerciseSelector;

const ExerciseBody = ({addExercise, exercise, index}) =>{

    const [isAdded, setIsAdded] = useState(false);

    const handleAddExercise = (exercise) => { 
        addExercise(exercise);
        setIsAdded(true);
        setTimeout(() => {
            setIsAdded(false);
        }, 1000);
    }
    return (
        <div key={'Add-exercise-'+index} className={styles['exercise-item']}>
            <span className={styles['exercise-name']}>{exercise.name}</span>
            <button type='button' className={styles['add-btn']} onClick={()=>handleAddExercise(exercise)}>
                <img src={isAdded ? IconLibrary.Checkmark : IconLibrary.Add} alt="Add" />
            </button>
        </div>
    )
}