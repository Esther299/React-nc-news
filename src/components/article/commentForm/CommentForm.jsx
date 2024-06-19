import { useState } from 'react';
import { postComment } from '../../../api';
import styles from './CommentForm.module.css';

function CommentForm({ articleId, setComments, selectedUser }) {
  const [body, setBody] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [errorCode, setErrorCode] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorMsg('');
    setErrorCode(null);
    if (selectedUser) {
      setIsSubmitting(true);
      const author = selectedUser.username;
      postComment(articleId, { author, body })
        .then((newComment) => {
          setComments((currentComments) => [newComment, ...currentComments]);
          setBody('');
          setIsSubmitting(false);
        })
        .catch(({ response: { data, status } }) => {
          setErrorMsg(data.msg);
          setErrorCode(status);
          setIsSubmitting(false);
        });
    }
  };

  return selectedUser ? (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="new-comment">Write a comment:</label>
        <textarea
          id="new-comment"
          aria-multiline="true"
          value={body}
          onChange={(event) => setBody(event.target.value)}
          required
          className={styles.textarea}
        ></textarea>
        <br />
        <p>Commenting as: {selectedUser.username}</p>
        <button type="submit" disabled={isSubmitting} className={styles.button}>
          {isSubmitting ? 'Adding...' : 'Add'}
        </button>
        {errorCode && (
          <p className={styles.error}>
            {errorCode}: {errorMsg}
          </p>
        )}
      </form>
    </div>
  ) : (
    <p>Log in to post a comment</p>
  );
}

export default CommentForm;
