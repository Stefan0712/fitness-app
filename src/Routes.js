import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import StartingPage from './components/pages/StartingPage/StartingPage.tsx';
import Dashboard from './components/pages/Dashboard/Dashboard';
import Library from './components/pages/Library/Library';
import Logs from './components/pages/Activity/Activity';
import Profile from './components/pages/Profile/Profile';
import Workout from './components/pages/Workout/Workout';
import EditWorkout from './components/pages/Workout/EditWorkout.tsx';
import CreateWorkout from './components/pages/Workout/CreateWorkout.tsx';
import EditExercise from './components/pages/Exercise/EditExercise.tsx';
import CreateExercise from './components/pages/Exercise/CreateExercise.tsx';
import EditProfile from './components/pages/Profile/EditProfile.tsx';
import ViewWorkout from './components/pages/Workout/ViewWorkout';
import ViewExercise from './components/pages/Exercise/ViewExercise';
import ViewBrowseExercise from './components/pages/Exercise/ViewBrowseExercise';
import ViewBrowseWorkout from './components/pages/Workout/ViewBrowseWorkout';
import Tags from './components/pages/Settings/Tags';
import Equipment from './components/pages/Settings/Equipment';
import Exercise from './components/pages/Exercise/Exercise';
import DashboardLayout from './components/pages/Dashboard/DashboardLayout';
import Settings from './components/pages/Settings/Settings.tsx';
import Explore from './components/pages/Explore/Explore.tsx';
import DefaultFields from './components/pages/Settings/DefaultFields.tsx';


function AppRoutes() {
  const location = useLocation();
  const navigate = useNavigate();

  const isFirstTime = useSelector((state)=>state.user.userData.firstRun);
  useEffect(()=>{
    if(isFirstTime && location.pathname !== '/get-started'){
      navigate('/get-started')
    }
  },[isFirstTime])

  
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
      <Route path="/workout/:snapshotId/restore" element={<Workout />} />
      <Route path="/workout/:id/edit" element={<EditWorkout />} />
      <Route path="/create-workout" element={<CreateWorkout />} />
      <Route path="/exercise/:id/view" element={<ViewExercise />} />
      <Route path="/exercise/:id/edit" element={<EditExercise />} />
      <Route path="/exercise/:id/start" element={<Exercise />} />
      <Route path="/exercise/:snapshotId/restore" element={<Exercise />} />
      <Route path="/create-exercise" element={<CreateExercise />} />
      <Route path='/browse/exercise/:id/view' element={<ViewBrowseExercise />} />
      <Route path='/browse/workout/:id/view' element={<ViewBrowseWorkout />} />
      <Route path='/tags' element={<Tags />} />
      <Route path='/explore' element={<Explore />} />
      <Route path='/equipment' element={<Equipment />} />
      <Route path='/settings' element={<Settings />} />
      <Route path='/edit-dashboard' element={<DashboardLayout />} />
      <Route path='/default-fields' element={<DefaultFields />} />
      <Route path="*" element={<Dashboard />} />
      
    </Routes>
  );
}

export default AppRoutes;
