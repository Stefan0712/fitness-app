import { useState } from 'react';
import styles from '../CreateWorkout.module.css';
import TagSelector from '../../../../common/TagSelector/TagSelector.tsx';
import Tag from '../../../../common/Tag/Tag.tsx';

const TagsScreen = ({tags, setTags}) => {

    
    const [showTagSelector, setShowTagSelector] = useState(false);


    return ( 
        <div className={styles.screen}>
            {showTagSelector ? <TagSelector close={()=>setShowTagSelector(false)} tags={tags} setTags={setTags} /> : null}
                <button type='button' className={styles.addTagButton} onClick={()=>setShowTagSelector(true)}> Add Tag</button>
            <div className={styles.tagsContainer}>
                {tags?.length > 0 ? tags.map((item)=><Tag tag={item} key={item.id} removeTag={(tagId)=>setTags(prev => [...prev.filter(item=>item.id !== tagId)])} />) : ''}
            </div>
        </div>
     );
}
 
export default TagsScreen;