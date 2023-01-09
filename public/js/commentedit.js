

// function to delete a blog based on id selected 
async function deleteComment(id) {
    event.preventDefault();
    event.stopPropagation();

    if (window.confirm("Are you sure you want to delete this comment?")) {
      const response = await fetch(`/api/comment/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({
          id: id
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.ok) {
        location.reload();
      } else {
        alert(response.statusText);
      }
    }
  };
  
  // function to get of a targeted blog
  const handleCommentDelete = (event) => {
    event.stopPropagation();
    const commentId = event.target.getAttribute('value');
    deleteComment(commentId)
  };
  
  // function to edit a targeted blog
//   const handleBlogEdit = (event) => {
//     event.stopPropagation();
//     const blogId = event.target.getAttribute('value');
//     document.location.replace('/edit/' + blogId)
//     console.log(blogId)
//   };


  // function to view a targeted blog 
  const handleCommentView = (event) => {
    event.stopPropagation();
    const blogId = event.target.getAttribute('value');
    document.location.replace('/blog/' + blogId)
    console.log(blogId)
  };

const deleteCommentBtns = document.querySelectorAll('.delete-icon')
const viewBlogBtns = document.querySelectorAll('.view-icon')

// const editBlogBtns = document.querySelectorAll('.edit-icon')

//iterate over each button as query selector only returns the first node.
for (let deleteCommentBtn of deleteCommentBtns) {
  deleteCommentBtn.addEventListener('click', handleCommentDelete);
}
for (let viewBlogBtn of viewBlogBtns) {
  viewBlogBtn.addEventListener('click', handleCommentView);
}
// for (let editCommentBtn of editCommentBtns) {
//   editCommentBtn.addEventListener('click', handleBlogEdit);
// }

