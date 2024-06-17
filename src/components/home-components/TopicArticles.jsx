import { useEffect, useState } from 'react';
import { getArticles } from '../../api'
import Articles from './Articles';

const Topic = ({ topic }) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getArticles(topic)
      .then((fetchedArticles) => {
        setArticles(fetchedArticles);
      })
      .catch((err) => {
        console.error('Error fetching articles:', err);
      });
  }, [topic]);

  return (
    <main>
      <h1>All the {topic} articles here:</h1>
      <Articles articles={articles} />
    </main>
  );
};

export default Topic;
