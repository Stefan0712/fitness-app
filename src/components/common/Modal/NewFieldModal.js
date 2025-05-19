import { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import { addCustomField } from "../../../store/userSlice.ts";



//TODO: Add animation, validation, change Value Type to a dropdown of text, number, or boolean


const NewFieldModal = ({closeModal}) => {


    const dispatch = useDispatch();


    const [name, setName] = useState('');
    const [description, setDescription] = useState("");
    const [unit, setUnit] = useState('');
    const [type, setType] = useState('');


    const handleSaveField = () =>{
        const fieldData = {name, description, unit, type};
        dispatch(addCustomField(fieldData));
        closeModal();
    }

    const handleResetInputs = () =>{
        setName('');
        setDescription('');
        setUnit('');
        setType('');
    }
    const handleCancelModal = () =>{
        handleResetInputs();
        closeModal();
    }
    return ( 
        <div className="new-field-modal">
            <div className="header">
                <h2>New Field</h2>
            </div>
            <fieldset>
                <label>Name</label>
                <input type="text" name="name" id="name" onChange={(e)=>setName(e.target.value)} value={name}></input>
            </fieldset>
            <fieldset>
                <label>Description</label>
                <input type="text" name="description" id="description" onChange={(e)=>setDescription(e.target.value)} value={description}></input>
            </fieldset>
            <fieldset>
                <label>Unit</label>
                <input type="text" name="unit" id="unit" onChange={(e)=>setUnit(e.target.value)} value={unit}></input>
            </fieldset>
            <fieldset>
                <label>Value Type</label>
                <input type="text" name="type" id="type" onChange={(e)=>setType(e.target.value)} value={type}></input>
            </fieldset>
            <div className="modal-buttons">
                <button onClick={handleSaveField}>Confirm</button>
                <button onClick={handleCancelModal}>Cancel</button>
            </div>
        </div>
     );
}
 
export default NewFieldModal;