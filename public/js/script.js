//what to do when the home button is clicked.
const handleHomeBtn = (event) => {
    event.stopPropagation();
    document.location.replace('/')

};
  // what to do when the dashboard button is clicked 
const handleDashboardBtn = (event) => {
    event.stopPropagation();
    document.location.replace('/dashboard')

  };


// get elements by id 
document.querySelector('#homeBtn').addEventListener('click', handleHomeBtn);
document.querySelector('#dashboardBtn').addEventListener('click', handleDashboardBtn);


