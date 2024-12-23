import { IconLibrary } from "../../../IconLibrary";
import { useState } from "react";
import { makeFirstUpperCase } from "../../../helpers";




const ManageGoalBody = ({goal}) => {

    const [showEdit, setShowEdit] = useState(false);
    const [confirmButtons, setConfirmButtons] = useState(false);



    
    return ( 
        <div className={`goal-body ${showEdit ? 'show-edit' : ''}`} key={goal.name}>
            <div className="goal-body-top">
                <img className='small-icon' src={goal.icon} alt=''></img>
                <p>{makeFirstUpperCase(goal.name)}</p>
                <div className="goal-buttons">
                    <img onClick={()=>setShowEdit((showEdit)=>!showEdit)} className='small-icon' src={IconLibrary.EditIcon}></img>
                </div>
            </div>
            <div className="edit-inputs">
                <input type='number' value={goal.target}></input>
                <input type='text' value={goal.unit}></input>
                <img className='small-icon' src={IconLibrary.SaveIcon}></img>
                <div className="delete-container">
                    
                        <div className={`confirm-buttons ${confirmButtons ? 'show-confirm' : ''}`}>
                            <img className='small-icon' src={IconLibrary.YesIcon}></img>
                            <img className='small-icon' src={IconLibrary.NoIcon} onClick={()=>setConfirmButtons(false)}></img>
                        </div>
                    
                        <img className={`delete-button small-icon ${confirmButtons ? 'hide' : ''}`} src={IconLibrary.DeleteIcon} onClick={()=>setConfirmButtons(true)}></img>
                    
                </div>
                
            </div>
            
        </div>
     );
}
 
export default ManageGoalBody;