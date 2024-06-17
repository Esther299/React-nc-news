import { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ArticlePage from './components/articlePage-components/ArticlePage';
import { getTopics } from './api';

function App() {
  const [user, setUser] = useState({});
  const [articles, setArticles] = useState([]);
  const [topics, setTopics] = useState([]);
  useEffect(() => {
    getTopics()
      .then((fetchedTopics) => {
        setTopics(fetchedTopics);
      })
      .catch((err) => {
        console.error('Error fetching topics:', err);
      });
  }, []);

  return (
    <BrowserRouter>
      <Header user={user} />
      <Navbar topics={topics} setTopics={setTopics} />
      <Routes>
        <Route
          path="/:topic?"
          element={<Home articles={articles} setArticles={setArticles} />}
        />
        <Route path="/articles/:article_id" element={<ArticlePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
