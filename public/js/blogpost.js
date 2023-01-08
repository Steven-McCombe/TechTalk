
//function to post a new blog with contents from a form as the request body
async function postForm(event) {
    event.preventDefault();
  
    const title = document.querySelector('#post-title').value;
    const content = document.querySelector('#post-content').value;
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
  

// function to delete a blog based on id selected 
async function deleteBlog(id) {
  event.preventDefault();
  const response = await fetch(`/api/blog/${id}`, {
    method: 'DELETE',
    body: JSON.stringify({
      id: id 
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
};

// function to get of a targeted blog
const handleBlogDelete = (event) => {
  event.stopPropagation();
  const blogId = event.target.getAttribute('value');
  deleteBlog(blogId)
};

// function to edit a targeted blog
const handleBlogEdit = (event) => {
  event.stopPropagation();
  const blogId = event.target.getAttribute('value');
  document.location.replace('/edit/' + blogId)
  console.log(blogId)
};
// function to view a targeted blog 
const handleBlogView = (event) => {
  event.stopPropagation();
  const blogId = event.target.getAttribute('value');
  document.location.replace('/blog/' + blogId)
  console.log(blogId)
};

document.querySelector('#postButton').addEventListener('click', postForm);
document.querySelector('#deleteIcon').addEventListener('click', handleBlogDelete);
document.querySelector('#viewIcon').addEventListener('click', handleBlogView);
document.querySelector('#editIcon').addEventListener('click', handleBlogEdit);



