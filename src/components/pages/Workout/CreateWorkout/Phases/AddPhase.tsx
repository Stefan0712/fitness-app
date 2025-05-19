import { v4 as uuidv4 } from 'uuid';
import { useState } from "react";


const NewPhase = ({close, addPhase, lastOrder}) => {

    const [name, setName] = useState('');

    const handleSubmit = () =>{
        if(name.length > 0){
            const newPhase = {
                id: uuidv4(),
                name,
                order: lastOrder + 1,
                exercises: []
            }
            addPhase(newPhase);
            close();
        }
    }
    return ( 
        <div style={{height: '200px', width: '300px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'var(--background)', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0,0,0,0.5)'}}>
            <h2>New Phase</h2>
            <input type="text" placeholder="Phase name" value={name} onChange={(e)=>setName(e.target.value)}/>
            <button type="button" onClick={handleSubmit} style={{width: '100px', height: '40px', borderRadius: '5px', backgroundColor: 'var(--accent-color)', border: 'none'}}>Create</button>
            <button type="button" onClick={close} style={{width: '100px', height: '40px', borderRadius: '5px', backgroundColor: 'var(--secondary)', border: 'none'}}>Cancel</button>
        </div>
     );
}
 
export default NewPhase;