import { useState } from 'react';
import { Link } from 'react-router-dom';

function Article({ article }) {
  return (
    <li>
      <h2>{article.title}</h2>
      <img src={article.article_img_url} />
      <h3>By {article.author}</h3>
      <p>Publish: {article.created_at.substring(0, 10)}</p>
      <p>Likes: {article.votes}</p>
      <Link className="link" to={`/articles/${article.article_id}`}>
        <button>View more</button>
      </Link>
    </li>
  );
}

export default Article;
