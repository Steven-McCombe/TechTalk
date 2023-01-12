const handleLoginBtn = (event) => {
    event.stopPropagation();
    document.location.replace('/login')

};
  // do this when the home button is clicked
const handleHomeBtn = (event) => {
  event.stopPropagation();
  document.location.replace('/')

};
//do this when the dashboard button is clicked
const handleDashboardBtn = (event) => {
  event.stopPropagation();
  document.location.replace('/login')

};


// get elements by id and run the functions on click 
document.querySelector('#guesthomeBtn').addEventListener('click', handleHomeBtn);
document.querySelector('#guestdashboardBtn').addEventListener('click', handleDashboardBtn);
 document.querySelector('#loginBtn').addEventListener('click', handleLoginBtn);