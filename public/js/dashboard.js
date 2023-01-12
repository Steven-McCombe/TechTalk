// function to delete a blog based on id selected 
async function deleteBlog(id) {
    event.preventDefault();
    event.stopPropagation();
    if (window.confirm("Are you sure you want to delete this post?")) {
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

  // get elements by class
const deleteBlogBtns = document.querySelectorAll('.delete-icon')
const viewBlogBtns = document.querySelectorAll('.view-icon')
const editBlogBtns = document.querySelectorAll('.edit-icon')

//iterate over each button as query selector only returns the first node.
for (let deleteBlogBtn of deleteBlogBtns) {
  deleteBlogBtn.addEventListener('click', handleBlogDelete);
}
for (let viewBlogBtn of viewBlogBtns) {
  viewBlogBtn.addEventListener('click', handleBlogView);
}
for (let editBlogBtn of editBlogBtns) {
  editBlogBtn.addEventListener('click', handleBlogEdit);
}

