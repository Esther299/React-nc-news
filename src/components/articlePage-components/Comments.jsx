import { useState } from 'react';
import CommentForm from './CommentForm';
import { deleteCommentById } from '../../api.js';

function Comments({ articleId, comments, setComments, selectedUser }) {
  const [deleteMessage, setDeleteMessage] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [errorCode, setErrorCode] = useState(null);

  const handleDelete = (comment_id) => {
    setError(null);
    setComments((currentComments) =>
      currentComments.filter((comment) => comment.comment_id !== comment_id)
    );
    setIsDeleting(true);
    deleteCommentById(comment_id)
      .then(() => {
        setIsDeleting(false);
        setDeleteMessage('Comment deleted successfully!');
        setTimeout(() => {
          setDeleteMessage('');
        }, 5000);
      })
      .catch(({ response: { data, status } }) => {
        setErrorMsg(data.msg);
        setErrorCode(status);
        setIsSubmitting(false);
      });
  };

  return (
    <div className="comments">
      <h3>Comments</h3>
      {deleteMessage && <p className="delete-message">{deleteMessage}</p>}
      <div className="comment-form">
        <CommentForm
          setComments={setComments}
          articleId={articleId}
          selectedUser={selectedUser}
        />
      </div>
      <ul className="comment-list">
        {comments.map((comment) => (
          <li key={comment.comment_id} className="comment-card">
            <p>{comment.body}</p>
            <p>By {comment.author}</p>
            <p>
              Posted: {comment.created_at.substring(0, 10)} at{' '}
              {comment.created_at.substring(11, 19)}
            </p>
            <p>Likes: {comment.votes}</p>
            {selectedUser && selectedUser.username === comment.author && (
              <>
                <button
                  onClick={() => handleDelete(comment.comment_id)}
                  disabled={isDeleting}
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
                {errorCode && errorCode ? (
                  <p>
                    {errorCode}: {errorMsg}
                  </p>
                ) : null}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Comments;
