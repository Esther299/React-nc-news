import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  getArticleById,
  getCommentsByArticleId,
  patchArticleById,
} from '../../api';
import './ArticlePage.css';
import Comments from './Comments';
import { Link } from 'react-router-dom';

const ArticlePage = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getArticleById(article_id)
      .then((fetchedArticle) => {
        setArticle(fetchedArticle);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching article:', err);
        setLoading(false);
      });

    getCommentsByArticleId(article_id)
      .then((fetchedComments) => {
        setComments(fetchedComments);
        setLoading(false)
      })
      .catch((err) => {
        console.error('Error fetching comments:', err);
        setLoading(false);
      });
  }, [article_id]);

  const upVote = (article_id) => {
    setArticle((currentArticle) => ({
      ...currentArticle,
      votes: currentArticle.votes + 1,
    }));

    patchArticleById(article_id)
      .then(() => {})
      .catch((err) => {
        console.error('Error upvoting article:', err);
      });
  };

  if (loading) {
    return <p className="loading">Loading...</p>;
  }

  return (
    <div className="article">
      <h2>{article.title}</h2>
      <p>{article.body}</p>
      <img src={article.article_img_url} alt={article.title} />
      <h3>By {article.author}</h3>
      <p className="substring">
        Published: {article.created_at.substring(0, 10)} at {article.created_at.substring(11, 19)}
      </p>
      <div className="vote-section">
        <p>Add likes:</p>
        <button onClick={() => upVote(article.article_id)}>
          {article.votes}
          <span aria-label="vote this article"> likes</span>
        </button>
      </div>
      <hr />
      <Comments comments={comments} />
      <hr />
      <Link className="link" to={`/`}>
        <button>Home</button>
      </Link>
    </div>
  );
};

export default ArticlePage;
