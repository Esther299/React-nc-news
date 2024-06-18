import { useState } from 'react';
import { postComment } from '../../api';

function CommentForm({ articleId, setComments, selectedUser }) {
  const [body, setBody] = useState('');
  console.log(selectedUser);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedUser) {
      const author = selectedUser.username;
      postComment(articleId, { author, body })
        .then((newComment) => {
          setComments((currentComments) => [ newComment, ...currentComments]);
          setBody('');
        })
        .catch((err) => {
          console.error('Error posting comment:', err);
        });
    }
  };

  return selectedUser ? (
    <>
      <form className="comment-adder" onSubmit={handleSubmit}>
        <label htmlFor="new-comment">Write a comment:</label>
        <textarea
          id="new-comment"
          aria-multiline="true"
          value={body}
          onChange={(event) => setBody(event.target.value)}
          required
        ></textarea>
        <br />
        <p>Commenting as: {selectedUser.username}</p>
        <button type="submit">Add</button>
      </form>
    </>
  ) : (
    <p>Log in to post a comment</p>
  );
}

export default CommentForm;
