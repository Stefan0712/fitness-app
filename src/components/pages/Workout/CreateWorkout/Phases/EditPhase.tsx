import { useState } from "react";


const EditPhase = ({close, phaseData, updatePhase}) => {

    const [name, setName] = useState(phaseData.name ?? '');

    const handleSubmit = () =>{
        if(name.length > 0){
            const newPhase = {
                ...phaseData,
                name,
            }
            updatePhase(newPhase);
            close();
        }
    }
    const formStyles: React.CSSProperties = {
        height: 'auto', 
        width: 'calc(100vw - 20px)', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        gap: '10px', 
        position: 'fixed', 
        bottom: '85px',
        left: '10px',
        backgroundColor: 'var(--background)', 
        padding: '20px 10px', 
        borderRadius: '10px', 
        boxShadow: '0 0 10px var(--general-border)'
    }
    const buttonsContainer = {
        width: "100%",
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '10px',
        height: '40px'
    }
    return ( 
        <div style={formStyles} className='slideUpBottom'>
            <h2>Edit Phase</h2>
            <input type="text" placeholder="Phase name" value={name} onChange={(e)=>setName(e.target.value)}/>
            <div style={buttonsContainer}>
                <button type="button" onClick={close} style={{width: '100%', height: '100%', borderRadius: '5px', backgroundColor: 'var(--secondary)', border: 'none'}}>Cancel</button>
                <button type="button" onClick={handleSubmit} style={{width: '100%', height: '100%', borderRadius: '5px', backgroundColor: 'var(--accent-color)', border: 'none'}}>Update</button>
            </div>
        </div>
     );
}
 
export default EditPhase;