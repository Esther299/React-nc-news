import { useState, useContext } from 'react';
import CommentForm from '../commentForm/CommentForm.jsx';
import styles from './Comments.module.css';
import Comment from './comment/Comment.jsx';
import { UserContext } from '../../../contexts/UserContext.jsx';

function Comments({ articleId, comments, setComments }) {
  const [deleteMessage, setDeleteMessage] = useState('');
  const { errorMsg, errorCode, isLoading } = useContext(UserContext);

  if (isLoading) {
    return <p className="loading">Loading...</p>;
  }

  if (!comments) return <ErrorPage />;

  if (errorCode || errorMsg) {
    return (
      <p className="error">
        {errorCode}: {errorMsg}
      </p>
    );
  }

  return (
    <div className={styles.comments}>
      <h3 className={styles.title}>Comments</h3>
      {deleteMessage && (
        <p className={styles["delete-message"]}>{deleteMessage}</p>
      )}
      <div className={styles.formContainer}>
        <CommentForm setComments={setComments} articleId={articleId} />
      </div>
      <ul className={styles.list}>
        {comments.map((comment) => (
          <li key={comment.comment_id}>
            <Comment
              comment={comment}
              setDeleteMessage={setDeleteMessage}
              setComments={setComments}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Comments;
