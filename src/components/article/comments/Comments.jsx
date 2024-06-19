import { useState, useContext } from 'react';
import CommentForm from '../commentForm/CommentForm.jsx';
import { deleteCommentById } from '../../../api.js';
import styles from './Comments.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../../../contexts/UserContext.jsx';


function Comments({ articleId, comments, setComments }) {
  const [deleteMessage, setDeleteMessage] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const { selectedUser, errorMsg, setErrorMsg, errorCode, setErrorCode } =
    useContext(UserContext);

  const handleDelete = (comment_id) => {
    setErrorMsg('');
    setErrorCode(null);
    setIsDeleting(true);

    setComments((currentComments) =>
      currentComments.filter((comment) => comment.comment_id !== comment_id)
    );

    deleteCommentById(comment_id)
      .then(() => {
        setIsDeleting(false);
        setDeleteMessage('Comment deleted successfully!');
        setTimeout(() => {
          setDeleteMessage('');
        }, 5000);
      })
      .catch((error) => {
        setIsDeleting(false);
        if (error.response) {
          setErrorMsg(error.response.data.msg);
          setErrorCode(error.response.status);
        } else {
          setErrorMsg('An error occurred while deleting the comment.');
          setErrorCode(null);
        }
        setComments((currentComments) => [...currentComments]);
      });
  };

  return (
    <div className={styles.comments}>
      <h3>Comments</h3>
      {deleteMessage && (
        <p className={styles['delete-message']}>{deleteMessage}</p>
      )}
      <div className={styles.formContainer}>
        <CommentForm
          setComments={setComments}
          articleId={articleId}
        />
      </div>
      <ul className={styles.list}>
        {comments.map((comment) => (
          <li key={comment.comment_id} className={styles.card}>
            <p className={styles['comment-body']}>{comment.body}</p>
            <p className={styles['comment-author']}>By {comment.author}</p>
            <p className={styles['comment-date']}>
              Posted: {comment.created_at.substring(0, 10)} at{' '}
              {comment.created_at.substring(11, 19)}
            </p>
            <div className={styles['comment-likes']}>
              {comment.votes >= 0 ? (
                <FontAwesomeIcon
                  icon={faThumbsUp}
                  className={styles['thumbs-up']}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faThumbsDown}
                  className={styles['thumbs-down']}
                />
              )}
              <span className={styles['likes-count']}>
                {comment.votes >= 0 ? comment.votes : -comment.votes}
              </span>
            </div>
            {selectedUser && selectedUser.username === comment.author && (
              <>
                <button
                  onClick={() => handleDelete(comment.comment_id)}
                  disabled={isDeleting}
                  className={styles['delete-button']}
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
                {errorCode && (
                  <p className={styles.error}>
                    {errorCode}: {errorMsg}
                  </p>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Comments;
