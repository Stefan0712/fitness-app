import { getDateForHeader } from "../../helpers";




const CreateExercise = () => {
    return ( 
        <div className="create-exercise-page page">
            <div className='header'>
                <div className='date'>{getDateForHeader()}</div>
                <h2>Create Exercise</h2>
                <form>
                    <fieldset>
                        <label>Name</label>
                        <input type="text" name="name" id="name" required={true} minLength={3} maxLength={20}></input>
                    </fieldset>
                    <fieldset>
                        <label>Description</label>
                        <input type="text" name="description" id="description"></input>
                    </fieldset>
                    <fieldset>
                        <label>Reference (URL)</label>
                        <input type="url" name="reference" id="reference"></input>
                    </fieldset>
                    <fieldset>
                        <label>Target Group</label>
                        <select name="targetGroup" id="targetGroup" required={true}>
                            <option value="arms">Arms</option>
                            <option value="legs">Legs</option>
                            <option value="chest">Chest</option>
                            <option value="back">Back</option>
                            <option value="shoulders">Shoulders</option>
                            <option value="abs">Abs</option>
                            <option value="glutes">Glutes</option>
                            <option value="full-body">Full Body</option>
                            <option value="core">Core</option>
                            <option value="calves">Calves</option>
                            <option value="biceps">Biceps</option>
                            <option value="triceps">Triceps</option>
                            <option value="forearms">Forearms</option>
                            <option value="hamstrings">Hamstrings</option>
                            <option value="quads">Quads</option>

                        </select>
                    </fieldset>
                    <fieldset>
                        <label>Difficulty</label>
                        <select name="difficulty" id="difficulty">
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                            <option value="expert">Expert</option>
                        </select>
                    </fieldset>
                    <fieldset>
                        <label>Type</label>
                        <select name="difficulty" id="difficulty">
                            <option value="cardio">Cardio</option>
                            <option value="strength">Strength</option>
                            <option value="hiit">HIIT</option>
                            <option value="mobility">Mobility</option>
                            <option value="endurance">Endurance</option>
                            <option value="plyometrics">Plyometrics</option>
                            <option value="powerlifting">Powerlifting</option>
                            <option value="calisthenics">Calisthenics</option>
                            <option value="yoga">Yoga</option>
                            <option value="stretching">Stretching</option>
                        </select>
                    </fieldset>
                    <fieldset>
                        <label>Fields</label>
                        <div className="fields-container"></div>
                        <div className="field-creator">
                            <h3>Create a new field</h3>
                            <input type="text" name="fieldName" id="fieldName" placeholder="Field Name"></input>
                            <input type="text" name="fieldUnit" id="fieldUnit" placeholder="Field Unit"></input>
                            <input type="number" name="fieldTarget" id="fieldTarget" placeholder="Target"></input>
                            <button className="orange-button medium-button">Add Field</button>
                        </div>
                    </fieldset>

                    <button className="orange-button large-button">Create Exercise</button>
                </form>
            </div>
        </div>
     );
}
 
export default CreateExercise;