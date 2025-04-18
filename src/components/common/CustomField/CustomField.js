import { IconLibrary } from "../../../IconLibrary";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateCustomField, deleteCustomField } from "../../../store/userSlice.ts";

//TODO: Check source type in the redux store to make sure nobody is trying to edit default items


const CustomField = ({field}) => {

    const dispatch = useDispatch();

    const [isExpanded, setIsExpanded] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);

   

    const [name, setName] = useState(field.name || '');
    const [description, setDescription] = useState(field.description || '');
    const [unit, setUnit] = useState(field.unit || '');

    const handleSaveEdit = () =>{
        setShowEdit(false);
        const fieldData = {
            id: field.id,
            name,
            description,
            unit
        }
        dispatch(updateCustomField(fieldData))



        setName(field.name || '');
        setDescription(field.description || '')
        setUnit(field.unit || '')
    }
    const handleCancelEdit = () =>{
        setShowEdit(false);
        
        setName(field.name || '');
        setDescription(field.description || '')
        setUnit(field.unit || '')
    }
    const toggleIsExpanded = () =>{
        setIsExpanded((isExpanded)=>!isExpanded);
        setShowConfirmDelete(false);
        setShowEdit(false);
    }
    return ( 
        <div className={`custom-field ${isExpanded ? 'expanded-custom-field' : ''} ${showEdit ? 'expanded-custom-field-edit' : ''}`} key={field.id}>
            <div className="custom-field-header" onClick={!showEdit ? toggleIsExpanded : null}>
                {showEdit ? <fieldset>{!showEdit ? <label>Name</label> : null}<input type="text" value={name} onChange={(e)=>setName(e.target.value)}></input></fieldset> : <p>{field.name}</p>}
            </div>
            <div className="custom-field-properties">
                <fieldset>
                {!showEdit ? <label>Description</label> : null}
                    {showEdit ? <input type="text" value={description} onChange={(e)=>setDescription(e.target.value)}></input> : <p>{field.description}</p>}
                </fieldset>
                
                
                
                <div className="bottom-section">
                    <fieldset className="unit-fieldset">
                        {!showEdit ? <label>Unit:</label> : null}
                        {showEdit ? <input type="text" value={unit} onChange={(e)=>setUnit(e.target.value)}></input> : <p>{field.unit}</p>}
                    </fieldset>
                    {console.log(field)}
                    {field.source === 'user' ? 
                        showEdit ? (
                            <div className="custom-field-buttons">
                                <img onClick={()=>handleSaveEdit()} src={IconLibrary.Yes} className="small-icon"></img>
                                <img onClick={()=>handleCancelEdit()} src={IconLibrary.No} className="small-icon"></img>
                            </div>
                            ) : showConfirmDelete ? (
                                <div className="custom-field-buttons">
                                    <img onClick={()=>dispatch(deleteCustomField(field.id))} src={IconLibrary.Yes} className="small-icon"></img>
                                    <img onClick={()=>setShowConfirmDelete(false)} src={IconLibrary.No} className="small-icon"></img>
                                </div>
                            ) : (
                                <div className="custom-field-buttons">
                                    <img onClick={()=>setShowEdit(true)} src={IconLibrary.Edit} className="small-icon"></img>
                                    <img onClick={()=>setShowConfirmDelete(true)} src={IconLibrary.Delete} className="small-icon"></img>
                                </div>
                    ) : null}
                </div>
                
                
                    
            </div>
        </div>
    );
}
 
export default CustomField;