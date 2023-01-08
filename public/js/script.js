const handleHomeBtn = (event) => {
    event.stopPropagation();
    document.location.replace('/')

  };
const handleDashboardBtn = (event) => {
    event.stopPropagation();
    document.location.replace('/dashboard')

  };



document.querySelector('#homeBtn').addEventListener('click', handleHomeBtn);
document.querySelector('#dashboardBtn').addEventListener('click', handleDashboardBtn);


