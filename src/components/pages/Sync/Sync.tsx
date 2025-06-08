import styles from './Sync.module.css';
import AppHeader from '../../common/AppHeader/AppHeader.tsx';
import { useState } from 'react';
import Import from './Import.tsx';
import Export from './Export.tsx';


const Sync = () => {
    

    const [currentScreen, setCurrentScreen] = useState<'import' | 'export' | 'backup'>('export');


    return (
        <div className={styles.sync}>
            <AppHeader title="Sync" />
            <div className={styles.screenSwitcher}>
                <button onClick={()=>setCurrentScreen('import')} className={`${styles.switchButton} ${currentScreen === 'import' ? styles.selected : ''}`}>Import</button>
                <button onClick={()=>setCurrentScreen('export')} className={`${styles.switchButton} ${currentScreen === 'export' ? styles.selected : ''}`}>Export</button>
                <button onClick={()=>setCurrentScreen('backup')} className={`${styles.switchButton} ${currentScreen === 'backup' ? styles.selected : ''}`}>Backup</button>
            </div>
            {currentScreen === 'import' ? <Import /> : currentScreen === 'export' ? <Export /> : <Import />}
        </div>
    )
    
}
 
export default Sync;