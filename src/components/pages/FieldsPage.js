import { getDateForHeader } from "../../helpers";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";


const FieldsPage = () => {

    const savedFields = useSelector((state)=>state.user.fields);
    return ( 
        <div className="fields-page page">
            <div className='header'>
                <div className='date'>{getDateForHeader()}</div>
                <h2>Custom Fields</h2>
                
            </div>
        </div>
     );
}
 
export default FieldsPage;