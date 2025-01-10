import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import StartingPage from './components/pages/StartingPage/StartingPage';
import Dashboard from './components/pages/Dashboard/Dashboard';
import Library from './components/pages/Library/Library';
import Logs from './components/pages/Activity/Activity';
import Profile from './components/pages/Profile/Profile';
import Workout from './components/pages/Workout/Workout';
import EditWorkout from './components/pages/Workout/EditWorkout';
import CreateWorkout from './components/pages/Workout/CreateWorkout';
import EditExercise from './components/pages/Exercise/EditExercise';
import CreateExercise from './components/pages/Exercise/CreateExercise';
import EditProfile from './components/pages/Profile/EditProfile';
import ViewWorkout from './components/pages/Workout/ViewWorkout';
import ViewExercise from './components/pages/Exercise/ViewExercise';
import ViewBrowseExercise from './components/pages/Exercise/ViewBrowseExercise';
import ViewBrowseWorkout from './components/pages/Workout/ViewBrowseWorkout';
import FieldsPage from './components/pages/Settings/FieldsPage';
import ExploreWorkouts from './components/pages/Library/ExploreWorkouts';
import ExploreExercises from './components/pages/Library/ExploreExercises';
import Groups from './components/pages/Settings/Groups';
import Tags from './components/pages/Settings/Tags';
import Equipment from './components/pages/Settings/Equipment';


function AppRoutes() {

  const navigate = useNavigate();
  const isFirstTime = useSelector((state)=>state.user.isFirstTime)
  if(isFirstTime){
    navigate('/get-started')
  }
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/get-started" element={<StartingPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/library" element={<Library />} />
      <Route path="/logs" element={<Logs />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/edit-profile" element={<EditProfile />} />
      <Route path="/workout/:id/view" element={<ViewWorkout />} />
      <Route path="/workout/:id/start" element={<Workout />} />
      <Route path="/workout/:id/edit" element={<EditWorkout />} />
      <Route path="/create-workout" element={<CreateWorkout />} />
      <Route path="/exercise/:id/view" element={<ViewExercise />} />
      <Route path="/exercise/:id/edit" element={<EditExercise />} />
      <Route path="/create-exercise" element={<CreateExercise />} />
      <Route path='/explore-workouts' element={<ExploreWorkouts />} />
      <Route path='/explore-exercises' element={<ExploreExercises />} />
      <Route path='/browse/exercise/:id/view' element={<ViewBrowseExercise />} />
      <Route path='/browse/workout/:id/view' element={<ViewBrowseWorkout />} />
      <Route path='/tags' element={<Tags />} />
      <Route path='/equipment' element={<Equipment />} />
      <Route path='/target-groups' element={<Groups />} />

      
    </Routes>
  );
}

export default AppRoutes;
