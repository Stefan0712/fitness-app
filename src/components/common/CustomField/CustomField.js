import { IconLibrary } from "../../../IconLibrary";
import { useState } from "react";
const CustomField = ({field}) => {

    const [isExpanded, setIsExpanded] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);

   

    const [name, setName] = useState(field.name || '');
    const [description, setDescription] = useState(field.description || '');
    const [unit, setUnit] = useState(field.unit || '');
    const [type, setType] = useState(field.unit || 'text');

    const handleSaveEdit = () =>{
        setShowEdit(false);

        setName(field.name || '');
        setDescription(field.description || '')
        setUnit(field.unit || '')
        setType(field.type || 'text')
    }
    const handleCancelEdit = () =>{
        setShowEdit(false);

        setName(field.name || '');
        setDescription(field.description || '')
        setUnit(field.unit || '')
        setType(field.type || 'text')
    }
    const toggleIsExpanded = () =>{
        setIsExpanded((isExpanded)=>!isExpanded);
        setShowConfirmDelete(false);
        setShowEdit(false);
    }
    return ( 
        <div className={`custom-field ${isExpanded ? 'expanded-custom-field' : ''}`} key={field.id}>
            <div className="custom-field-header">
                {showEdit ? <fieldset><labe>Name</labe><input type="text" value={name} onChange={(e)=>setName(e.target.value)}></input></fieldset> : <p>{field.name}</p>}
                <img onClick={toggleIsExpanded} src={IconLibrary.InfoCircle} className="small-icon" alt="info"></img>
            </div>
            <div className="custom-field-properties">
                <fieldset>
                    <label>Description</label>
                    {showEdit ? <input type="text" value={description} onChange={(e)=>setDescription(e.target.value)}></input> : <p>{field.description}</p>}
                </fieldset>
                <fieldset>
                    <label>Unit</label>
                    {showEdit ? <input type="text" value={unit} onChange={(e)=>setUnit(e.target.value)}></input> : <p>{field.unit}</p>}
                </fieldset>
                <fieldset>
                    <label>Value Type</label>
                    {showEdit ? <input type="text" value={type} onChange={(e)=>setType(e.target.value)}></input> : <p>{field.type}</p>}
                </fieldset>
                
                
                
                
                {showEdit ? (
                    <div className="custom-field-buttons">
                        <img onClick={()=>handleSaveEdit()} src={IconLibrary.Yes} className="small-icon"></img>
                        <img onClick={()=>handleCancelEdit()} src={IconLibrary.No} className="small-icon"></img>
                    </div>
                ) : showConfirmDelete ? (
                    <div className="custom-field-buttons">
                        <img onClick={()=>setShowConfirmDelete(false)} src={IconLibrary.Yes} className="small-icon"></img>
                        <img onClick={()=>setShowConfirmDelete(false)} src={IconLibrary.No} className="small-icon"></img>
                    </div>
                ) : (
                    <div className="custom-field-buttons">
                        <img onClick={()=>setShowEdit(true)} src={IconLibrary.Edit} className="small-icon"></img>
                        <img onClick={()=>setShowConfirmDelete(true)} src={IconLibrary.Delete} className="small-icon"></img>
                    </div>
                )}
                    
            </div>
        </div>
    );
}
 
export default CustomField;