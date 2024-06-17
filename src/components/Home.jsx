import { useState, useEffect } from 'react';
import { getArticles } from '../api';
import Articles from './home-components/Articles';

function Home({ articles, setArticles }) {
  useEffect(() => {
    getArticles()
      .then((fetchedArticles) => {
        setArticles(fetchedArticles);
      })
      .catch((err) => {
        console.error('Error fetching articles:', err);
      });
  }, []);

  return (
    <main>
      <Articles articles={articles} />
    </main>
  );
}
export default Home;
