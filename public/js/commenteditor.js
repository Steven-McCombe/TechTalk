
//function to update a blog with contents from a form as the request body
async function commentForm(event) {
    event.preventDefault();
  
const comment_body = document.querySelector('#edit-content').value.trim();
const id = document.querySelector('#saveButton').getAttribute('value');

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
  



document.querySelector('#saveButton').addEventListener('click', commentForm);
