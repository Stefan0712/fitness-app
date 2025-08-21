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