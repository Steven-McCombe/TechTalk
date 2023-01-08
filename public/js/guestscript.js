const handleLoginBtn = (event) => {
    event.stopPropagation();
    document.location.replace('/login')

};
  
const handleHomeBtn = (event) => {
  event.stopPropagation();
  document.location.replace('/')

};
const handleDashboardBtn = (event) => {
  event.stopPropagation();
  document.location.replace('/login')

};



document.querySelector('#guesthomeBtn').addEventListener('click', handleHomeBtn);
document.querySelector('#guestdashboardBtn').addEventListener('click', handleDashboardBtn);
 document.querySelector('#loginBtn').addEventListener('click', handleLoginBtn);