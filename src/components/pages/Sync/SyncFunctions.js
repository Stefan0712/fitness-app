import { getAllItems } from "../../../db";

const buildExportBlob = (type, data) => {
  const exportObject = {
    type,
    version: '1.0',
    createdAt: new Date().toISOString(),
    source: 'local',
    itemCount: data.length,
    data
  };

  const json = JSON.stringify(exportObject, null, 2);
  return new Blob([json], { type: 'application/json' });
};

export const handleExportExercises = async () => {
  const data = await getAllItems('exercises');
  if (data) {
    const blob = buildExportBlob('exercises', data);
    const fileName = `exercises-export-${Date.now()}.json`;

    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export const handleExportWorkouts = async () => {
  const data = await getAllItems('workouts');
  if (data) {
    const blob = buildExportBlob('workouts', data);
    const fileName = `workouts-export-${Date.now()}.json`;

    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export const handleImportExercises = () =>{
    console.log('Imported exercises')
}
export const handleImportWorkouts = () =>{
    console.log('Imported workouts')
}