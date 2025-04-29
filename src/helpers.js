export const getDateForHeader = () =>{
    const options = { weekday: 'long', day: 'numeric', month: 'short' };
    return new Date().toLocaleDateString(undefined, options);
    
}
export const makeFirstUpperCase = (string)=>{
    if(string && string.length > 0){
      return string[0].toUpperCase() + string.slice(1);
    }else {return ""}
}
export const getDayFromDate = (date) =>{
    if (!date) return '';  
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    return day;
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
  currentDate.setHours(0, 0, 0, 0); // Normalize time

  let startOfRange;

  if (type === 'current-week') {
    const currentDay = currentDate.getDay();
    startOfRange = new Date(currentDate);
    startOfRange.setDate(currentDate.getDate() - (currentDay === 0 ? 6 : currentDay - 1)); // Monday as start
  } else if (type === 'last-seven-days') {
    startOfRange = new Date(currentDate);
    startOfRange.setDate(currentDate.getDate() - 6);
  } else {
    throw new Error("Invalid type. Use 'current-week' or 'last-seven-days'.");
  }

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const range = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(startOfRange);
    day.setDate(startOfRange.getDate() + i); // Correctly compute each day

    const formattedDate = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`; // Avoid timezone issues
    const dayOfMonth = day.getDate(); // Get correct day of the month
    const dayOfWeek = (day.getDay() + 6) % 7; // Align Monday as 0

    range.push({
      dayNo: i + 1,
      short: weekDays[dayOfWeek],
      long: day.toLocaleDateString('en-US', { weekday: 'long' }),
      date: formattedDate,
      day: dayOfMonth, 
      logs: []
    });
  }

  return range;
};



export const convertToNumber = (value) => {
  // Use parseInt if the value is not already a number
  return typeof value === "number" ? value : parseInt(value, 10) || 0;
};
export const convertFullDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed, so add 1
  const day = String(date.getDate()).padStart(2, '0'); // Pad day with leading zero if necessary

  return `${year}-${month}-${day}`;
};

export const getHourFromTimestamp = (timestamp)=>{
  const date = new Date(timestamp); // Convert the timestamp to a Date object
  const hours = date.getHours().toString().padStart(2, '0'); // Get hours and pad with leading zero if needed
  const minutes = date.getMinutes().toString().padStart(2, '0'); // Get minutes and pad with leading zero if needed
  return `${hours}:${minutes}`; // Combine hours and minutes
}
export const getDateFromTimestamp = (timestamp) => {
  const date = new Date(timestamp); // Convert the timestamp to a Date object
  const day = date.getDate(); // Get the day of the month
  const month = date.toLocaleString('en-US', { month: 'short' }); // Get the short month name
  return `${day} ${month}`; // Combine day and month
}
export const formatActivityDate = (date) => {
  const dateObj = new Date(date);

  // Check if the conversion is valid
  if (isNaN(dateObj.getTime())) {
      throw new Error("Invalid date format");
  }


  const options = { weekday: 'short', day: 'numeric', month: 'short' };
  return dateObj.toLocaleDateString('en-US', options);  // "Wed, 25 Nov"
};