const Toggle = ({isActive, turnOn, turnOff}) => {

    const toggleStyles = {
        width: '50px',
        height: '30px',
        display: 'flex',
        padding: '2px',
        alignItems: 'center',
        borderRadius: '50px',
        justifyContent: isActive ? 'flex-end' : 'flex-start',
        backgroundColor: isActive ? 'var(--accent-color)' : 'var(--background)',
        transition: 'all 0.1s',
        border: '1px solid rgba(211, 211, 211, 0.1)',
    }
    const ballStyles = {
        width: '26px',
        height: '26px',
        borderRadius: '50px',
        backgroundColor: 'white',
        transition: 'all 0.1s',
    }
    return ( 
        <button style={toggleStyles} onClick={()=> isActive ? turnOff() : turnOn()}>
            <div style={ballStyles}></div>
        </button>
     );
}
 
export default Toggle;