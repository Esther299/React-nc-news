function Comments({ comments }) {
  return (
    <div className="comments">
      <h3>Comments</h3>
      <ul className="comment-list">
        {comments.map((comment) => (
          <li key={comment.comment_id} className="comment-card">
            <p>{comment.body}</p>
            <p>By {comment.author}</p>
            <p>Posted: {comment.created_at.substring(0, 10)}</p>
            <p>Likes: {comment.votes}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Comments;
