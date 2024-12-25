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



export const getWeekRange = (selectedDate, type = 'current-week') => {
  const currentDate = new Date(selectedDate);
  currentDate.setHours(0, 0, 0, 0); // Ensure consistent start time

  let startOfRange;

  if (type === 'current-week') {
      // Calculate the start of the week (Monday)
      const currentDay = currentDate.getDay();
      startOfRange = new Date(currentDate);
      startOfRange.setDate(currentDate.getDate() - currentDay + 1); // Move to Monday
  } else if (type === 'last-seven-days') {
      // Calculate the start of the last 7 days range
      startOfRange = new Date(currentDate);
      startOfRange.setDate(currentDate.getDate() - 6); // Move 6 days back to include today
  } else {
      throw new Error("Invalid type. Use 'current-week' or 'last-seven-days'.");
  }

  const weekDays = [
      { short: 'Mon', long: 'Monday' },
      { short: 'Tue', long: 'Tuesday' },
      { short: 'Wed', long: 'Wednesday' },
      { short: 'Thu', long: 'Thursday' },
      { short: 'Fri', long: 'Friday' },
      { short: 'Sat', long: 'Saturday' },
      { short: 'Sun', long: 'Sunday' }
  ];

  const range = [];
  for (let i = 0; i < 7; i++) {
      const day = new Date(startOfRange);
      day.setDate(startOfRange.getDate() + i); // Add i days to get each day in the range

      const formattedDate = day.toISOString().split('T')[0]; // yyyy-mm-dd
      const dayOfMonth = day.getDate(); // Day of the month
      const dayOfWeek = day.getDay(); // Day of the week (0-6)

      range.push({
          dayNo: i + 1,
          short: weekDays[dayOfWeek]?.short || '',
          long: weekDays[dayOfWeek]?.long || '',
          date: formattedDate,
          day: dayOfMonth,
          logs: []
      });
  }

  return range.reverse();
};
