export const getEmailIconText = (email) => {
    if (!email) return '';
  
    const [username] = email.split('@');
   
    if (username.length <= 2) return username.toUpperCase(); 
    if (username.length<=4) return username.charAt(0).toUpperCase();
    const iconText = username.charAt(0).toUpperCase() +  username.charAt(username.length/2).toUpperCase();
    return iconText;
  };
  
  