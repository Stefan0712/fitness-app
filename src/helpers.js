export const getDateForHeader = () =>{
    const options = { weekday: 'long', day: 'numeric', month: 'short' };
    return new Date().toLocaleDateString(undefined, options);
    
}
export const makeFirstUpperCase = (string)=>{
    return string[0].toUpperCase() + string.slice(1);
}
export const formatDate = (date) => {
    if (!date) return '';  
  
    const d = new Date(date);
  
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0'); 
    const year = d.getFullYear();
  
    
    return `${day}/${month}/${year}`;
  };