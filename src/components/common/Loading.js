import { IconLibrary } from "../../IconLibrary";
import AppHeader from "./AppHeader/AppHeader.tsx";

const Loading = ({title}) => {

    return ( 
        <div className={'loadingPage'}>
            <AppHeader title={title} />
            <div className={'loadingContainer'}>
                <img className={'loadingIcon'} src={IconLibrary.Loading} alt="" />
            </div>
        </div>
     );
}
 
export default Loading;