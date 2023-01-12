
//function to update a blog with contents from a form as the request body
async function postForm(event) {
    event.preventDefault();
// get data from the form.
const title = document.querySelector('#edit-title').value.trim();
const contents = document.querySelector('#edit-content').value.trim();
const id = document.querySelector('#saveButton').getAttribute('value');

  // send data as a request to route specified 
  if (contents && title && id != ""){
    const response = await fetch(`/api/blog/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title,
        contents,
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
  



document.querySelector('#saveButton').addEventListener('click', postForm);



