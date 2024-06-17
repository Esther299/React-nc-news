import { useState } from 'react';
import { postComment } from '../../api';

function CommentForm({ articleId, setComments,selectedUser }) {
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    postComment(articleId, { selectedUser, body })
      .then((newComment) => {
        setComments((currentComments) => [...currentComments, newComment]);
        setAuthor('');
        setBody('');
      })
      .catch((err) => {
        console.error('Error posting comment:', err);
      });
  };

  return (
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
      <label htmlFor="username">
        Write your username:{' '}
        <input
          id="username"
          type="text"
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
          required
        />
      </label>
      <button type="submit">Add</button>
    </form>
  );
}

export default CommentForm;
