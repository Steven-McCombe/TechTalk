
//function to post a new comment on a blog
async function commentForm(event) {
    event.preventDefault();

    const blog_id = event.target.getAttribute('value');
    const comment_body = document.querySelector('#commentContent').value;

  console.log(comment_body)
  console.log(blog_id)
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
  
    if (response.ok) {
    } else {
      alert(response.statusText);
    }
  }
};
  
document.querySelector('#commentBtn').addEventListener('click', commentForm);


