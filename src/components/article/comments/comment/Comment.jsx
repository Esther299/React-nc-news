import { useState, useContext } from 'react';
import { deleteCommentById, patchCommentById } from '../../../../api.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../../../../contexts/UserContext.jsx';
import styles from './Comment.module.css';

function Comment({ setDeleteMessage, comment: initialComment, setComments }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const { selectedUser, errorMsg, setErrorMsg, errorCode, setErrorCode } =
    useContext(UserContext);
  const [hasVotedLike, setHasVotedLike] = useState(false);
  const [hasVotedDislike, setHasVotedDislike] = useState(false);
  const [commentState, setCommentState] = useState(initialComment);

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

  const handleVote = (comment_id, voteType) => {
    let num = 0;
    if (voteType === 'upvote') {
      num = !hasVotedLike ? 1 : -1;
      setHasVotedLike(!hasVotedLike);
    }
    if (voteType === 'downvote') {
      num = !hasVotedDislike ? -1 : 1;
      setHasVotedDislike(!hasVotedDislike);
    }

    const updatedVotes = commentState.votes + num;
    setCommentState((currentComment) => ({
      ...currentComment,
      votes: updatedVotes,
    }));

    patchCommentById(comment_id, num)
      .then(() => {})
      .catch(({ response: { data, status } }) => {
        setErrorMsg(data.msg);
        setErrorCode(status);
        setIsLoading(false);
        setHasVoted(!hasVoted);
      });
  };
  return (
    <div className={styles.card}>
      <p className={styles['comment-body']}>{commentState.body}</p>
      <p className={styles['comment-author']}>By {commentState.author}</p>
      <p className={styles['comment-date']}>
        Posted: {commentState.created_at.substring(0, 10)} at{' '}
        {commentState.created_at.substring(11, 19)}
      </p>
      <div className={styles['vote-section']}>
        <button
          className={styles.likeButton}
          onClick={() => handleVote(commentState.comment_id, 'upvote')}
        >
          <FontAwesomeIcon icon={faThumbsUp} className={styles['thumbs']} />
          <span aria-label="like this comment">
            {hasVotedLike ? (
              <span className={styles.undo} aria-label="undo">
                Undo
              </span>
            ) : (
              'Like'
            )}
          </span>
        </button>
        <button
          className={styles.dislikeButton}
          onClick={() => handleVote(commentState.comment_id, 'downvote')}
        >
          <FontAwesomeIcon icon={faThumbsDown} className={styles['thumbs']} />
          <span aria-label="dislike this comment">
            {hasVotedDislike ? (
              <span className={styles.undo} aria-label="undo">
                Undo
              </span>
            ) : (
              'Dislike'
            )}
          </span>
        </button>
      </div>
      <p>Total votes: {commentState.votes}</p>
      {selectedUser && selectedUser.username === commentState.author && (
        <>
          <button
            onClick={() => handleDelete(commentState.comment_id)}
            disabled={isDeleting}
            className={styles['delete-button']}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
          {errorCode && (
            <p className="error">
              {errorCode}: {errorMsg}
            </p>
          )}
        </>
      )}
    </div>
  );
}
export default Comment;
