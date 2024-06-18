import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  getArticleById,
  getCommentsByArticleId,
  patchArticleById,
} from '../api';
import './ArticlePage.css';
import Comments from './articlePage-components/Comments';
import { Link } from 'react-router-dom';

const ArticlePage = ({ selectedUser }) => {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasVoted, setHasVoted] = useState(false);
  const [error, setError] = useState(null);

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
      .catch(() => {
        setError('Error fetching data');
        setIsLoading(false);
      });
  }, [article_id]);

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
        .catch(() => {
          setError('Error voting article:');
        });
    }
  };

  if (isLoading) {
    return <p className="loading">Loading...</p>;
  }

  return !error ? (
    <div className="article">
      <h2>{article.title}</h2>
      <p>{article.body}</p>
      <img src={article.article_img_url} alt={article.title} />
      <h3>By {article.author}</h3>
      <p className="substring">
        Published: {article.created_at.substring(0, 10)} at{' '}
        {article.created_at.substring(11, 19)}
      </p>
      <div className="vote-section">
        <p>Add likes:</p>
        <button onClick={() => upVote(article.article_id)}>
          {article.votes}
          <span aria-label="vote this article"> likes</span>
        </button>
      </div>
      <hr />
      <Comments
        comments={comments}
        setComments={setComments}
        articleId={article.article_id}
        selectedUser={selectedUser}
      />
      <hr />
      <Link className="link" to={`/`}>
        <button>Home</button>
      </Link>
    </div>
  ) : (
    <p>{error}</p>
  );
};

export default ArticlePage;
