import { getDateForHeader } from "../../helpers";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Timer from "./common/Timer";
import './stylings/workout.css';
import checkIcon from '../../assets/checkmark.svg';
import arrowIcon from '../../assets/arrow.svg';

const Workout = () => {
    const { id } = useParams();
    const workoutData = useSelector((state) => state.user.workouts.find((item) => item.id === id));
    const exercises = useSelector((state) => state.user.exercises.filter((ex) => workoutData.exercises.includes(ex.id)));
    const [currentExercise, setCurrentExercise] = useState(0);
    const [fields, setFields] = useState({});

    useEffect(() => {
        const exercise = exercises[currentExercise];
        if (exercise) {
            const initialFields = {};
            for (let i = 0; i < exercise.sets; i++) {
                const setKey = `set${i + 1}`;
                initialFields[setKey] = {};
                exercise.fields.forEach(field => {
                    initialFields[setKey][field.name] = {
                        value: '',
                        targetValue: field.target,
                        unit: field.unit
                    };
                });
            }
            setFields(initialFields);
        }
    }, [currentExercise, exercises]);

    const handleInputChange = (setIndex, fieldName, value) => {
        setFields((prevFields) => ({
            ...prevFields,
            [`set${setIndex}`]: {
                ...prevFields[`set${setIndex}`],
                [fieldName]: {
                    ...prevFields[`set${setIndex}`][fieldName],
                    value: value
                }
            }
        }));
    };

    // Functions to move through exercises
    const prevExercise = () => {
        if (currentExercise > 0) {
            setCurrentExercise(currentExercise - 1);
        }
    };
    const nextExercise = () => {
        if (currentExercise < exercises.length - 1) {
            setCurrentExercise(currentExercise + 1);
        }
    };

    // Function to complete the set
    const completeSet = (setIndex) => {
        setFields((prevFields) => {
            const updatedSet = { ...prevFields[`set${setIndex}`] };
            Object.keys(updatedSet).forEach(fieldName => {
                updatedSet[fieldName].value = updatedSet[fieldName].targetValue; // Set value to target
            });
            return {
                ...prevFields,
                [`set${setIndex}`]: updatedSet
            };
        });
    };

    return (
        <div className="workout-page page">
            <div className='header'>
                <div className='date'>{getDateForHeader()}</div>
                <h2>{workoutData.name}</h2>
            </div>
            <Timer />

            <div className="current-exercise section">
                <div className="current-exercise-top">
                    <img className="small-icon left-arrow" src={arrowIcon} onClick={prevExercise} alt="Previous Exercise" />
                    <h3>{exercises[currentExercise]?.name}</h3>
                    <img className="small-icon" src={arrowIcon} onClick={nextExercise} alt="Next Exercise" />
                </div>
                <div className="fields">
                    {Object.keys(fields).map((setKey, index) => {
                        const setIndex = parseInt(setKey.replace('set', ''));
                        const isCompleted = Object.keys(fields[setKey]).every(fieldName => 
                            fields[setKey][fieldName].value >= fields[setKey][fieldName].targetValue // Check if each field is complete
                        );

                        return (
                            <div className="set" key={index}>
                                <h4>{index + 1}</h4>
                                {Object.keys(fields[setKey]).map(fieldName => (
                                    <div className="field" key={fieldName}>
                                        <input
                                            type="text"
                                            placeholder={`${fields[setKey][fieldName].targetValue} ${fields[setKey][fieldName].unit}`}
                                            value={fields[setKey][fieldName].value}
                                            onChange={(e) => handleInputChange(setIndex, fieldName, e.target.value)}
                                        />
                                    </div>
                                ))}
                                <img
                                    className={`small-icon ${isCompleted ? 'orange-bg' : ''}`} // Add class based on completion status
                                    src={checkIcon}
                                    onClick={() => completeSet(setIndex)} // Call completeSet correctly
                                    alt="Check"
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="workout-exercises section">
                <h3 className="subtitle full-width">Exercises</h3>
                {exercises.map((exercise, index) => (
                    <div className={`exercise-body ${currentExercise === index ? 'selected-exercise' : ''}`} key={index + 'exercise'} onClick={() => setCurrentExercise(index)}>
                        <b>{index + 1}</b><p>{exercise.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Workout;
