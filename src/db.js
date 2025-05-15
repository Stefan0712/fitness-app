import { openDB } from 'idb';

export const initDB = async () => {
  return openDB('EasyFitDB', 1, {
    upgrade(db) {
      db.createObjectStore('exercises', { keyPath: '_id' });
      db.createObjectStore('workouts', { keyPath: '_id' });
    },
  });
};

export const saveExercise = async (exercise) => {
  const db = await initDB();
  await db.put('exercises', exercise);
};
export const saveWorkout = async (workout) => {
  const db = await initDB();
  await db.put('workouts', {...workout, isCached: true});
};

export const getAllExercises = async () => {
  const db = await initDB();
  return await db.getAll('exercises');
};
export const getAllWorkouts = async () => {
  const db = await initDB();
  return await db.getAll('workouts');
};
export const getWorkoutById = async (id) => {
  const db = await initDB();
  return await db.get('workouts', id);
};
export const deleteExercise = async (id) => {
  const db = await initDB();
  await db.delete('exercises', id);
};

export const getExerciseById = async (id) => {
  const db = await initDB();
  return await db.get('exercises', id);
};

