import { useState } from 'react';
import CommentForm from './CommentForm';
import { deleteCommentById } from '../../api.js';

function Comments({ articleId, comments, setComments, selectedUser }) {

  const handleDelete = (comment_id) => {
    deleteCommentById(comment_id)
      .then(() => {
        setComments((currentComments) =>
          currentComments.filter((comment) => comment.comment_id !== comment_id)
        );
      })
      .catch((err) => {
        console.error('Error deleting comment:', err);
      });
  };


  return (
    <div className="comments">
      <h3>Comments</h3>
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
              <button onClick={() => handleDelete(comment.comment_id)}>
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Comments;
