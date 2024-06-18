import Article from './Article';

function Articles({ articles }) {
  return (
    <ul className="articles-list">
      {articles.map((article) => (
        <Article key={article.article_id} article={article} />
      ))}
    </ul>
  );
}

export default Articles;
