import { IconLibrary } from "../../../IconLibrary"

const ProgressCircle = ({width, height, backgroundColor, barColor, progress, centerContent='text'}) => {

    const background = {
        background: `conic-gradient( ${barColor} calc(${progress} * 1%), #e5e7eb 0% )`,
        width,
        height,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '100%',
    }

    const core = {
        backgroundColor,
        width: '80%',
        height: '80%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '100%',
    }
    const text = {
        fontSize: '80%'
    }

    return ( 
        <div style={background}>
            <div style={core}>
                {centerContent === 'text' ? <p style={text}>{progress}%</p> : centerContent==='icon' && progress >= 100 ? <img style={{width: '70%', height: '70%'}} alt="" src={IconLibrary.Checkmark} /> : null}
            </div>
        </div>
     );
}
 
export default ProgressCircle;