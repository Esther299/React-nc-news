import { useState, useEffect } from 'react';
import { getArticles } from '../../api';
import Articles from './home-components/articles/Articles';
import { useParams, useSearchParams } from 'react-router-dom';
import styles from './Home.module.css';

function Home({ articles, setArticles }) {
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [errorMsg, setErrorMsg] = useState('');
  const [errorCode, setErrorCode] = useState(null);

  const defaultSortBy = 'created_at';
  const defaultOrderBy = 'desc';
  const sortByParam = searchParams.get('sort_by') || defaultSortBy;
  const orderByParam = searchParams.get('order_by') || defaultOrderBy;

  const [sortBy, setSortBy] = useState(sortByParam);
  const [orderBy, setOrderBy] = useState(orderByParam);

  const { topic } = useParams();

  useEffect(() => {
    if (!searchParams.has('sort_by')) {
      searchParams.set('sort_by', defaultSortBy);
    }
    if (!searchParams.has('order_by')) {
      searchParams.set('order_by', defaultOrderBy);
    }
    setSearchParams(searchParams);

    setIsLoading(true);
    getArticles(topic, { sort_by: sortBy, order_by: orderBy })
      .then((fetchedArticles) => {
        setArticles(fetchedArticles);
        setIsLoading(false);
      })
      .catch(({ response: { data, status } }) => {
        setErrorMsg(data.msg);
        setErrorCode(status);
        setIsLoading(false);
      });
  }, [topic, sortBy, orderBy]);

  function handleChangeOrder(event) {
    const newOrder = event.target.value;
    setOrderBy(newOrder);
    searchParams.set('order_by', newOrder);
    setSearchParams(searchParams);
  }

  function handleChangeSort(event) {
    const newSort = event.target.value;
    setSortBy(newSort);
    searchParams.set('sort_by', newSort);
    setSearchParams(searchParams);
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
