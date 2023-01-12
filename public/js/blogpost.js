
//function to post a new blog with contents from a form as the request body
async function postForm(event) {
    event.preventDefault();
  // get data from the form.
    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();

  // send data as a request to route specified 
  if (content && title !== ""){
    const response = await fetch(`/api/blog`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        content
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
   //await the response. if ok go to dashboard if not alert the user with the status
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  
}
};
  



document.querySelector('#postButton').addEventListener('click', postForm);




