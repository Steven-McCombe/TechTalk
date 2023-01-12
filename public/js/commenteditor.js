
//function to update a blog with contents from a form as the request body
async function commentForm(event) {
    event.preventDefault();
  // get data from form entries and store as variable 
const comment_body = document.querySelector('#edit-content').value.trim();
const id = document.querySelector('#saveButton').getAttribute('value');

  // send data in the request body to the specified route 
  if (comment_body && id != ""){
    const response = await fetch(`/api/comment/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        comment_body,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  
}
};
  


// event handler to tell the programm what to do when save button is clicked 
document.querySelector('#saveButton').addEventListener('click', commentForm);
