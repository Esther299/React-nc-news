import { useState } from 'react';
import { postComment } from '../../api';

function CommentForm({ articleId, setComments, selectedUser }) {
  const [body, setBody] = useState('');
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(null);
    if (selectedUser) {
      setIsSubmitting(true)
      const author = selectedUser.username;
      postComment(articleId, { author, body })
        .then((newComment) => {
          setComments((currentComments) => [newComment, ...currentComments]);
          setBody('');
          setIsSubmitting(false)
        })
        .catch((err) => {
          console.error('Error posting comment:', err);
          setError('Failed to post the comment. Try again.');
          setIsSubmitting(false)
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
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Adding...' : 'Add'}
        </button>
        {error && <p>{error}</p>}
      </form>
    </>
  ) : (
    <p>Log in to post a comment</p>
  );
}

export default CommentForm;
