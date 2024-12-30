import { getDateForHeader } from "../../helpers";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { defaultFields } from "../../constants/defaultFields";
import CustomField from "../CustomField";
import './stylings/FieldsPage.css';
import { IconLibrary } from "../../IconLibrary";
import NewFieldModal from "./common/NewFieldModal";

const FieldsPage = () => {
    //TODO: Handle edit and delete, add comments, add transitions, maybe make it prettier
    const customFields = useSelector((state)=>state.user.fields);

    const [modal, setModal] = useState(null);
    const [showDefaultFields, setShowDefaultFields] = useState(false);

    const handleCheckboxChange = (event) => {
        setShowDefaultFields(event.target.checked); 
    };

    const closeModal = () =>{
        setModal(null);
    }
    const showModal = () =>{
        setModal(<NewFieldModal closeModal={closeModal} />)
    }
    return ( 
        <div className="fields-page page">
            {modal ? modal : null}
            <div className='header'>
                <div className='date'>{getDateForHeader()}</div>
                <h2>Custom Fields</h2>
                {!modal ? <button onClick={showModal} className="clear-button new-field-button"><img className="small-icon" src={IconLibrary.Plus} /></button> : null}
            </div>
            <div className="filters">
                <fieldset>
                    <label>Show Default Fields</label>
                    <input type="checkbox" onChange={handleCheckboxChange} checked={showDefaultFields} />
                </fieldset>
            </div>
            
            <div className={`fields-container ${showDefaultFields ? 'expand-container' : ''}`}>
                <div className="fields-container-header"><p>Default Fields</p><p>{defaultFields.length}</p></div>
                {defaultFields?.map((field)=><CustomField key={'CustomField'+field.name} field={field} />)}
            </div>
            <div className={`fields-container expand-container`}>
                <div className="fields-container-header"><p>Custom Fields</p><p>{customFields.length}</p></div>
                {customFields?.map((field)=><CustomField key={'CustomField'+field.name} field={field} />)}
            </div>
        </div>
     );
}
 
export default FieldsPage;