import { IconLibrary } from "../../../IconLibrary";
import { useState } from "react";
import { makeFirstUpperCase } from "../../../helpers";




const ManageGoalBody = ({goal, showLog}) => {

    const [showEdit, setShowEdit] = useState(false);



    
    return ( 
        <button className='goal-body' onClick={()=>showLog(goal.name)} key={goal.name}>
            <img className='small-icon' src={goal.icon} alt=''></img>
            <p>{makeFirstUpperCase(goal.name)}</p>
            <div className="edit-inputs">
                <input type='number' value={goal.target}></input>
                <input type='text' value={goal.unit}></input>
            </div>
            <img className='small-icon' src={IconLibrary.EditIcon}></img>
            <img className='small-icon' src={IconLibrary.DeleteIcon}></img>
            
        </button>
     );
}
 
export default ManageGoalBody;