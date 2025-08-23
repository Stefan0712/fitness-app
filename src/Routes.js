import { Routes, Route } from 'react-router-dom';
import StartingPage from './components/pages/StartingPage/StartingPage.tsx';
import Dashboard from './components/pages/Dashboard/Dashboard';
import Library from './components/pages/Library/Library';
import Logs from './components/pages/Activity/Activity';
import Profile from './components/pages/Profile/Profile';
import Workout from './components/pages/Workout/Workout.tsx';
import EditWorkout from './components/pages/Workout/EditWorkout/EditWorkout.tsx';
import CreateWorkout from './components/pages/Workout/CreateWorkout/CreateWorkout.tsx';
import EditExercise from './components/pages/Exercise/EditExercise.tsx';
import CreateExercise from './components/pages/Exercise/CreateExercise.tsx';
import EditProfile from './components/pages/Profile/EditProfile.tsx';
import ViewWorkout from './components/pages/Workout/ViewWorkout/ViewWorkout';
import ViewExercise from './components/pages/Exercise/ViewExercise/ViewExercise';
import Tags from './components/pages/Settings/Tags';
import Equipment from './components/pages/Settings/Equipment';
import Exercise from './components/pages/Exercise/Exercise';
import DashboardLayout from './components/pages/Dashboard/DashboardLayout';
import Settings from './components/pages/Settings/Settings.tsx';
import Explore from './components/pages/Explore/Explore.tsx';
import DefaultFields from './components/pages/Settings/DefaultFields.tsx';
import Auth from './components/pages/Auth/Auth.tsx';
import Sync from './components/pages/Sync/Sync.tsx';
import Goals from './components/pages/Goals/Goals.tsx';
import ViewGoal from './components/pages/Goals/ViewGoal.tsx';
import WorkoutsLibrary from './components/pages/Library/WorkoutsLibrary/WorkoutsLibrary.tsx';
import ExerciseLibrary from './components/pages/Library/ExercisesLibrary/ExercisesLibrary.tsx';
import Muscles from './components/pages/Muscles/Muscles.tsx';


function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/auth" element={<Auth />} />
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
      <Route path='/tags' element={<Tags />} />
      <Route path='/sync' element={<Sync />} />
      <Route path='/explore' element={<Explore />} />
      <Route path='/exercises-library' element={<ExerciseLibrary />} />
      <Route path='/workouts-library' element={<WorkoutsLibrary />} />
      <Route path='/equipment' element={<Equipment />} />
      <Route path='/settings' element={<Settings />} />
      <Route path='/edit-dashboard' element={<DashboardLayout />} />
      <Route path='/default-fields' element={<DefaultFields />} />
      <Route path='/goals' element={<Goals />} />
      <Route path='/muscles' element={<Muscles />} />
      <Route path='/goals/view/:id' element={<ViewGoal />} />
      <Route path="*" element={<Dashboard />} />
      
    </Routes>
  );
}

export default AppRoutes;
