
//function to post a new blog with contents from a form as the request body
async function postForm(event) {
    event.preventDefault();
  
    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();
  console.log(title)
  console.log(content)
  

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
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  
}
};
  



document.querySelector('#postButton').addEventListener('click', postForm);




