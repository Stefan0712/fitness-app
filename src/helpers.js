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

  export const getFullHour = () => {
    const now = new Date();
    
    // Get hours, minutes, and seconds
    const hours = now.getHours().toString().padStart(2, '0');    // Add leading zero if necessary
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    
    // Return formatted time
    return `${hours}:${minutes}:${seconds}`;
  }
  export const getCurrentDay = () =>{
    return new Date().toISOString().split('T')[0];
  }
  export const convertTimestampToDate = (timestamp) => {
    return new Date(timestamp).toISOString().split('T')[0];
};
  export const formatTime = (totalSeconds) => {
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };


  export const makeDateNice = (dateString) =>{
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    const date = new Date(dateString); // Parse the date string
    const year = date.getFullYear();
    const month = months[date.getMonth()]; // Get month in short format (e.g. "Dec")
    const day = date.getDate();
    
    return `${year} ${month} ${day}`;
}


export const convertGroupFromLowerToUpperCase = (input)=>{
  return input
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' '); 
}



export const getFullWeek = (selectedDate) =>{
  const currentDate = new Date(selectedDate);
    
    // Get the day of the week 
    const currentDay = currentDate.getDay();
    
    // Calculate the difference to get the start of the week (Monday)
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDay + 1); // Move to Monday (or adjust if Sunday)
    startOfWeek.setHours(0, 0, 0, 0); // Set to midnight for consistency

    const weekDays = [
        { short: 'Mon', long: 'Monday' },
        { short: 'Tue', long: 'Tuesday' },
        { short: 'Wed', long: 'Wednesday' },
        { short: 'Thu', long: 'Thursday' },
        { short: 'Fri', long: 'Friday' },
        { short: 'Sat', long: 'Saturday' },
        { short: 'Sun', long: 'Sunday' }
    ];

    const week = [];
    for (let i = 0; i < 7; i++) {
        const day = new Date(startOfWeek);
        day.setDate(startOfWeek.getDate() + i); // Add i days to get each day of the week
        
        const formattedDate = day.toISOString().split('T')[0]; // yyyy-mm-dd
        const dayOfMonth = day.getDate(); // day of the month

        week.push({
            dayNo: i + 1, 
            short: weekDays[i].short,
            long: weekDays[i].long,
            date: formattedDate,
            day: dayOfMonth,
            logs:[]
        });
    }

    return week;
}