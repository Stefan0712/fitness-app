
import React from 'react';
import { Tag as ITag } from './../../common/interfaces.ts';
import { IconLibrary } from '../../../IconLibrary';

interface TagProps {
    tag: ITag;
    removeTag?: (id: string) => void;
}
const Tag: React.FC<TagProps>= ({tag, removeTag}) => {

    const tagStyles = {
        height: '40px',
        padding: '0 10px',
        borderRadius: '5px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        width: 'fit-content',
        backgroundColor: 'var(--background)',
    }
    const tagColorStyles = {
        width: '10px',
        height: '10px',
        borderRadius: '25px',
        backgroundColor: tag.color
    }
    return ( 
        <div style={tagStyles}>
            <div style={tagColorStyles}></div>
            <p style={{color: 'var(--text-color)', fontSize: '14px', fontWeight: '500'}}>{tag.name}</p>
            {removeTag ? <button type="button" className="clear-button" onClick={()=>removeTag(tag._id)}><img src={IconLibrary.Close} className="small-icon" alt="" /></button> : null}  
        </div>
     );
}
 
export default Tag;