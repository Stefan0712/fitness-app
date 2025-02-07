import { useState } from "react";
import { useSelector } from "react-redux";

import './FieldsPage.css';

import { getDateForHeader } from "../../../helpers";
import { defaultFields } from "../../../constants/defaultFields";
import { IconLibrary } from "../../../IconLibrary";
import CustomField from "../../common/CustomField/CustomField";
import NewField from "./NewField";

const FieldsPage = () => {
    //TODO: Handle edit and delete, add comments, add transitions, maybe make it prettier
    const customFields = useSelector((state)=>state.user.fields);

    const [showCreateField, setShowCreateField] = useState(null);
    const [screenToShow, setScreenToShow] = useState('custom')

  
    return ( 
        <div className="fields-page page">
            
            <div className='header'>
                <div className='date'>{getDateForHeader()}</div>
                <div className="one-line">
                    <h2>Custom Fields</h2>
                    <button className="clear-button" onClick={()=>setShowCreateField(true)}><img src={IconLibrary.Add} className="small-icon" alt="create field"></img></button>
                </div>
            </div>
            <div className="screen-toggle-buttons">
                <button onClick={()=>setScreenToShow('custom')} className={screenToShow === 'custom' ? 'selected-button' : ''}>Custom Fields ({customFields.length})</button>
                <button onClick={()=>setScreenToShow('default')} className={screenToShow === 'default' ? 'selected-button' : ''}>Default Fields ({defaultFields.length})</button>
            </div>
            <div className="screens-container">
                {screenToShow === 'custom' ? (
                    <div className={`screen`}>
                        {customFields?.map((field)=><CustomField key={'CustomField'+field.name} field={field} />)}
                    </div>
                ):null}
                {screenToShow === 'default' ? (
                    <div className={`screen`}>
                        {defaultFields?.map((field)=><CustomField key={'CustomField'+field.name} field={field} />)}
                    </div>
                ): null}
            </div>
            {showCreateField ? (
                <NewField closeModal={()=>setShowCreateField(false)} />
            ) : null}
        </div>
     );
}
 
export default FieldsPage;