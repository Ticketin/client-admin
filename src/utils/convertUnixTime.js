export const convertUnixTime = (unixTime) => {
    // Create a new Date object with the provided Unix time (in milliseconds)
    const date = new Date(unixTime * 1000);
  
    // Format the date components
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based
    const year = date.getFullYear();
  
    // Format the time components
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? 'PM' : 'AM';
  
    // Convert 24-hour format to 12-hour format
    hours = hours % 12 || 12;
  
    // Construct the formatted date string
    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes.toString().padStart(2, '0')}${period}`;
  
    return formattedDate;
  }