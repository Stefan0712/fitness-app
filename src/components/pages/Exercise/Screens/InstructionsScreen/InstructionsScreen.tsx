import { useState } from 'react';
import { IconLibrary } from '../../../../../IconLibrary';
import styles from './InstructionsScreen.module.css';

const InstructionsScreen = ({instructions, setInstructions}) => {

    const [instruction, setInstruction] = useState('');



    const handleAddInstruction = () =>{
        if(instruction.length > 0 && instruction.length < 400){
            setInstructions(prev=>[...prev, instruction]);
            setInstruction('');
        }
    }
    return ( 
        <div className={styles.instructionsScreen}>
            <div className={styles.newInstruction}>
                <input type='text' id='instruction' name='instruction' value={instruction} onChange={(e)=>setInstruction(e.target.value)} minLength={0} maxLength={500} placeholder='Instruction'/>
                <button onClick={handleAddInstruction} type='button' className='clear-button'><img src={IconLibrary.Add} alt='add new field' style={{width: '30px', height: '30px'}} /></button>
            </div>
            <div className={styles.createdInstructions}>
                    {instructions?.length > 0 ? instructions.map((item: string, index: number)=><div className={styles.instruction} key={'instruction-'+index}>
                    <p>{index + 1}. {item}</p>
                    <button onClick={()=>setInstructions(prev=>[...prev.filter(instr=>instr!==item)])} type='button' className='clear-button'><img src={IconLibrary.Close} alt='add new field' style={{width: '30px', height: '30px'}} /></button></div>) 
                : <p>No instruction added</p>}
            </div>
        </div> 
    );
}
 
export default InstructionsScreen;