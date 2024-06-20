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
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
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
  const [hasVoted, setHasVoted] = useState(false);

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

  const upVote = (article_id) => {
    if (!hasVoted) {
      setArticle((currentArticle) => ({
        ...currentArticle,
        votes: currentArticle.votes + 1,
      }));

      patchArticleById(article_id)
        .then(() => {
          setHasVoted(true);
        })
        .catch(({ response: { data, status } }) => {
          setErrorMsg(data.msg);
          setErrorCode(status);
          setIsLoading(false);
        });
    }
  };

  if (isLoading) {
    return <p className="loading">Loading...</p>;
  }

  if (!article) return <ErrorPage />;

  if (errorCode || errorMsg) {
    return (
      <p className='error'>
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
        <button onClick={() => upVote(article.article_id)}>
          <span aria-label="vote this article"> Add likes</span>
        </button>
        {article.votes}
        <FontAwesomeIcon icon={faThumbsUp} className={styles['thumbs-up']} />
      </div>
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
