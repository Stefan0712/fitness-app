import { Set } from "../../common/interfaces";
import {v4 as uuidv4} from 'uuid';

// Format the original exercises array form workoutData 
    export const formatExercise = (exercise) =>{
        console.log(exercise.name, exercise.rest)
        // Initialize an empty array of sets
        const newSets: Set[] = [];
        const newExerciseId = uuidv4(); // Set a new ID so that even if two identical exercises are inside a workout there won't be any issues
        // Defining the template for all sets
        const setTemplate: Set = {
            exerciseId: newExerciseId,
            isCompleted: false,
            isSkipped: false,
            rest: exercise.rest,
            order: exercise.length,
            fields: exercise.fields.length > 0 ? [...exercise.fields] : [],
            duration: 0,
            startedAt: undefined,
            finishedAt: undefined,
            status:'not-started'
        }
        // Add one set by default if sets is less than one not not defined at all
        if(!exercise.sets || exercise.sets < 1){
            newSets.push({...setTemplate, _id: uuidv4()});
        }else{
            // Or add setTemple for the number of times that sets property specify
            for (let i = 0; i < exercise.sets; i++) {
                newSets.push({...setTemplate, _id: uuidv4()});
            }
        }
        // Create a simple new exercise instance with only needed information
        const ex = {
            ...exercise,
            initialId: exercise._id,
            _id: newExerciseId,
            sets: newSets,
            isCompleted: false,
        };
        return ex;
    }