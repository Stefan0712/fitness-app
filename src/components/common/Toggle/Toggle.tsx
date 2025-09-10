const Toggle = ({isActive, turnOn, turnOff}) => {

    const toggleStyles = {
        width: '50px',
        height: '30px',
        display: 'flex',
        padding: '2px',
        alignItems: 'center',
        border: 'none',
        borderRadius: '50px',
        justifyContent: isActive ? 'flex-end' : 'flex-start',
        backgroundColor: isActive ? 'var(--accent-color)' : 'var(--background)',
        transition: 'all 0.1s',
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