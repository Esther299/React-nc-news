import { Link } from 'react-router-dom';
import styles from './Article.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

function Article({ article }) {
  return (
    <li className={styles.article}>
      <Link className={styles.link} to={`/articles/${article.article_id}`}>
      <h2 className={styles.title}>{article.title}</h2>
      <img
        className={styles["article-img"]}
        src={article.article_img_url}
        alt="Article Image"
      />
      <h3 className={styles.author}>By {article.author}</h3>
      <p className={styles.date}>
        Published: {article.created_at.substring(0, 10)} at{" "}
        {article.created_at.substring(11, 19)}
      </p>
      <div className={styles["article-likes"]}>
        {article.votes >= 0 ? (
          <FontAwesomeIcon icon={faThumbsUp} className={styles["thumbs-up"]} />
        ) : (
          <FontAwesomeIcon
            icon={faThumbsDown}
            className={styles["thumbs-down"]}
          />
        )}
        <span className={styles["likes-count"]}>
          {article.votes >= 0 ? article.votes : -article.votes}
        </span>
      </div>
      </Link>
    </li>
  );
}

export default Article;
