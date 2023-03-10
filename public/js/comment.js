
//function to post a new comment on a blog
async function commentForm(event) {
    event.preventDefault();
// get data from the form 
    const blog_id = event.target.getAttribute('value');
    const comment_body = document.querySelector('#commentContent').value.trim();

// send data as the request body to the specified route 
  if (blog_id && comment_body !== ""){
    const response = await fetch(`/api/comment`, {
      method: 'POST',
      body: JSON.stringify({
        comment_body,
        blog_id
      }),
      headers: {
        'Content-Type': 'application/json'
      } 
    });
    location.reload();
  // await response
    if (response.ok) {
    } else {
      alert(response.statusText);
    }
  }
};
  
document.querySelector('#commentBtn').addEventListener('click', commentForm);


