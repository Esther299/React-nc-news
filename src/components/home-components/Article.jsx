import { useState } from 'react';

function Article({ article }) {
  return (
    <li>
      <h2>{article.title}</h2>
      <img src={article.article_img_url} />
      <h3>By {article.author}</h3>
      <p>Publish: {article.created_at.substring(0, 10)}</p>
      <p>Likes: {article.votes}</p>
    </li>
  );
}

export default Article;
