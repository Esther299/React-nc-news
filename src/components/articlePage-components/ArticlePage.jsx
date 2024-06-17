import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getArticleById, getCommentsByArticleId } from '../../api';
import './ArticlePage.css';
import Comments from './Comments';

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
      })
      .catch((err) => {
        console.error('Error fetching comments:', err);
      });
  }, [article_id]);

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
        Publish: {article.created_at.substring(0, 10)}
      </p>
      <p className="substring">Likes: {article.votes}</p>
      <hr />
      <Comments comments={comments}/>
    </div>
  );
};

export default ArticlePage;
