import React from 'react';
import { Routes, Route } from 'react-router-dom';
import StartingPage from './components/pages/StartingPage';
import Dashboard from './components/pages/Dashboard';
import Library from './components/pages/Library';
import Logs from './components/pages/Logs';
import Profile from './components/pages/Profile';
import Workout from './components/pages/Workout';
import EditWorkout from './components/pages/EditWorkout';
import CreateWorkout from './components/pages/CreateWorkout';
import Exercise from './components/pages/Exercise';
import EditExercise from './components/pages/EditExercise';
import CreateExercise from './components/pages/CreateExercise';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/get-started" element={<StartingPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/library" element={<Library />} />
      <Route path="/logs" element={<Logs />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/workout/:id" element={<Workout />} />
      <Route path="/workout/:id/edit" element={<EditWorkout />} />
      <Route path="/create-workout" element={<CreateWorkout />} />
      <Route path="/exercise/:id" element={<Exercise />} />
      <Route path="/exercise/:id/edit" element={<EditExercise />} />
      <Route path="/exercise-workout" element={<CreateExercise />} />
      
    </Routes>
  );
}

export default AppRoutes;
