import { useState, useEffect } from 'react';
import { getArticles } from '../api';
import Articles from './home-components/Articles';
import { useParams, useSearchParams } from 'react-router-dom';

function Home({ articles, setArticles }) {
  const [isLoading, setIsLoding] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState(null);

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

    setIsLoding(true);
    getArticles(topic, { sort_by: sortBy, order_by: orderBy })
      .then((fetchedArticles) => {
        setArticles(fetchedArticles);
        setIsLoding(false);
      })
      .catch(() => {
        setError('Error fetching articles');
        setIsLoding(false);
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
    return <p className="loading">Loading...</p>;
  }

  return !error ? (
    <main>
      <h1>All the {topic} articles here:</h1>
      <div>
        <label>
          Sort by:
          <select value={sortBy} onChange={handleChangeSort}>
            <option value="created_at">Date</option>
            <option value="comment_count">Comment count</option>
            <option value="votes">Votes</option>
          </select>
        </label>
        <label>
          Order:
          <select value={orderBy} onChange={handleChangeOrder}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>
      <Articles articles={articles} />
    </main>
  ) : (
    <p>{error}</p>
  );
}
export default Home;
