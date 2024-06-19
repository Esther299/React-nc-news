import Article from '../article/Article';
import styles from './Articles.module.css'

function Articles({ articles }) {
  return (
    <ul className={styles.list}>
      {articles.map((article) => (
        <Article key={article.article_id} article={article} />
      ))}
    </ul>
  );
}

export default Articles;
