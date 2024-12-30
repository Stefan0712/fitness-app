const Tag = ({tag}) => {
    return ( 
        <div className="tag-body" key={tag.id}>
            <div className="tag-color" style={{backgroundColor: tag.color}}></div>
            <div className="tag-name">{tag.name}</div>
        </div>
     );
}
 
export default Tag;