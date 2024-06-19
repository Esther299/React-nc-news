import {  useContext } from 'react';
import Articles from './home-components/articles/Articles';
import { useParams } from 'react-router-dom';
import styles from './Home.module.css';
import { UserContext } from '../../contexts/UserContext';
import { useFetchArticles } from './useFetchArticles';
import { useArticleSearchParams } from './useArticleSearchParams';

function Home({ articles, setArticles }) {
  const { topic } = useParams();
  const { sortBy, orderBy, setSortBy, setOrderBy } = useArticleSearchParams();
  const { isLoading, setIsLoading, errorMsg, setErrorMsg, errorCode, setErrorCode } = useContext(UserContext);

  useFetchArticles(
    topic,
    sortBy,
    orderBy,
    setArticles,
    setIsLoading,
    setErrorMsg,
    setErrorCode
  );

  function handleChangeOrder(event) {
    const newOrder = event.target.value;
    setOrderBy(newOrder);
  }

  function handleChangeSort(event) {
    const newSort = event.target.value;
    setSortBy(newSort);
  }

  if (isLoading) {
    return <p className='loading'>Loading...</p>;
  }

  if (errorCode || errorMsg) {
    return (
      <p>
        {errorCode}: {errorMsg}
      </p>
    );
  }

  return (
    <main className={styles['main-content']}>
      <h1>All the {topic} articles here:</h1>
      <div className={styles['sort-controls']}>
        <label>
          Sort by:{' '}
          <select
            value={sortBy}
            onChange={handleChangeSort}
            className={styles.select}
          >
            <option value="created_at">Date</option>
            <option value="comment_count">Comment count</option>
            <option value="votes">Votes</option>
          </select>
        </label>
        <label>
          Order:{' '}
          <select
            value={orderBy}
            onChange={handleChangeOrder}
            className={styles.select}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>
      <div className={styles['articles-container']}>
        <Articles articles={articles} />
      </div>
    </main>
  );
}
export default Home;
