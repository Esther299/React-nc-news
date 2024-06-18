import { useState, useEffect } from 'react';
import { getArticles } from '../api';
import Articles from './home-components/Articles';
import { useParams } from 'react-router-dom';

function Home({ articles, setArticles }) {
  const [isLoading, setIsLoding] = useState();

  const { topic } = useParams();

  useEffect(() => {
    setIsLoding(true);
    getArticles(topic)
      .then((fetchedArticles) => {
        setArticles(fetchedArticles);
        setIsLoding(false);
      })
      .catch((err) => {
        console.error('Error fetching articles:', err);
        setIsLoding(false);
      });
  }, [topic]);

if (isLoading) {
  return <p className="loading">Loading...</p>;
}
  
  return (
    <main>
      <h1>All the {topic} articles here:</h1>
      <Articles articles={articles} />
    </main>
  );
}
export default Home;
