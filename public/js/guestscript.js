const handleLoginBtn = (event) => {
    event.stopPropagation();
    document.location.replace('/login')

  };
  document.querySelector('#loginBtn').addEventListener('click', handleLoginBtn);