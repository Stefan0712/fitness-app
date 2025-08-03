import { IconLibrary } from "../../../IconLibrary"

const ProgressCircle = ({width, height, backgroundColor, barColor, progress}) => {

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
        fontSize: '60%'
    }

    return ( 
        <div style={background}>
            <div style={core}>
                {progress >= 100 ? <img style={{width: '70%', height: '70%'}} alt="" src={IconLibrary.Checkmark} /> : <p style={text}>{Number(progress.toFixed(1))}%</p> }
            </div>
        </div>
     );
}
 
export default ProgressCircle;