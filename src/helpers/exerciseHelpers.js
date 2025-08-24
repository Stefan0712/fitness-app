export const normalizeExercise = (ex) =>{
    console.log(ex)
    const convertedExercise = {
        author: ex.author,
        sourceId: ex._id,
        difficulty: ex.difficulty,
        duration: ex.duration,
        durationUnit: ex.durationUnit,
        rest: ex.rest,
        restUnit: ex.restUnit,
        name: ex.name,
        isCompleted: false,
        description: ex.description,
        reference: ex.reference,
        notes: ex.notes,
        equipment: [...ex.equipment],
        tags: [...ex.tags],
        instructions: [...ex.instructions],
        
    }
    console.log(convertedExercise)
}


export const ConvertMetaDuration = (seconds) => {
  if (seconds < 60) {
    return `${seconds} s`;
  } else {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  }
};