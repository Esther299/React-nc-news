import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import {
  getArticleById,
  getCommentsByArticleId,
  patchArticleById,
} from '../../api';
import styles from './ArticlePage.module.css';
import Comments from './comments/Comments';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../../contexts/UserContext';
import ErrorPage from '../ErrorPage';

const ArticlePage = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const {
    errorMsg,
    setErrorMsg,
    errorCode,
    setErrorCode,
    isLoading,
    setIsLoading,
  } = useContext(UserContext);
  const [hasVotedLike, setHasVotedLike] = useState(false);
  const [hasVotedDislike, setHasVotedDislike] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      getArticleById(article_id),
      getCommentsByArticleId(article_id),
    ])
      .then(([fetchedArticle, fetchedComments]) => {
        setArticle(fetchedArticle);
        setComments(fetchedComments);
        setIsLoading(false);
      })
      .catch(({ response: { data, status } }) => {
        setErrorMsg(data.msg);
        setErrorCode(status);
        setIsLoading(false);
      });
  }, [article_id, setIsLoading, setErrorMsg, setErrorCode]);

  const handleVote = (article_id, voteType) => {
    let num = 0;
    if (voteType === 'upvote') {
      num = !hasVotedLike ? 1 : -1;
      setHasVotedLike(!hasVotedLike);
    }
    if (voteType === 'downvote') {
      num = !hasVotedDislike ? -1 : 1;
      setHasVotedDislike(!hasVotedDislike);
    }

    const updatedVotes = article.votes + num;

    setArticle((currentArticle) => ({
      ...currentArticle,
      votes: updatedVotes,
    }));

    patchArticleById(article_id, num)
      .then(() => {})
      .catch(({ response: { data, status } }) => {
        setErrorMsg(data.msg);
        setErrorCode(status);
        setIsLoading(false);
        setHasVoted(!hasVoted);
      });
  };

  if (isLoading) {
    return <p className="loading">Loading...</p>;
  }

  if (!article) return <ErrorPage />;

  if (errorCode || errorMsg) {
    return (
      <p className="error">
        {errorCode}: {errorMsg}
      </p>
    );
  }

  return (
    <div className={styles.article}>
      <h2>{article.title}</h2>
      <p>{article.body}</p>
      <img src={article.article_img_url} alt={article.title} />
      <h3 className={styles.author}>By {article.author}</h3>
      <p className={styles.substring}>
        Published: {article.created_at.substring(0, 10)} at{' '}
        {article.created_at.substring(11, 19)}
      </p>
      <div className={styles['vote-section']}>
        <button
          className={styles.likeButton}
          onClick={() => handleVote(article.article_id, 'upvote')}
        >
          <FontAwesomeIcon icon={faThumbsUp} className={styles['thumbs']} />
          <span aria-label="like this article">
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
          onClick={() => handleVote(article.article_id, 'downvote')}
        >
          <FontAwesomeIcon icon={faThumbsDown} className={styles['thumbs']} />
          <span aria-label="dislike this article">
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
        <p>Total votes: {article.votes}</p>
      <hr />
      <Comments
        comments={comments}
        setComments={setComments}
        articleId={article.article_id}
      />
      <hr />
      <Link className={styles.link} to={`/`}>
        <button>Home</button>
      </Link>
    </div>
  );
};

export default ArticlePage;
