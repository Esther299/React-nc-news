import CommentForm from './CommentForm';

function Comments({ articleId, comments, setComments }) {
  return (
    <div className="comments">
      <h3>Comments</h3>
      <ul className="comment-list">
        {/* {console.log(comments)} */}
        {comments.map((comment) => (
          <li key={comment.comment_id} className="comment-card">
            <p>{comment.body}</p>
            <p>By {comment.author}</p>
            <p>
              Posted: {comment.created_at.substring(0, 10)} at{' '}
              {comment.created_at.substring(11, 19)}
            </p>
            <p>Likes: {comment.votes}</p>
          </li>
        ))}
      </ul>
      <div className="comment-form">
        <CommentForm setComments={setComments} articleId={articleId} />
      </div>
    </div>
  );
}
export default Comments;
