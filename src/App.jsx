import { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Topic from './components/home-components/TopicArticles';

function App() {
  const [user, setUser] = useState({});
  const [articles, setArticles] = useState([]);
  const [topics, setTopics] = useState([]);
  return (
    <BrowserRouter>
      <Header user={user} />
      <Navbar topics={topics} setTopics={setTopics} />
      <Routes>
        <Route
          path="/"
          element={<Home articles={articles} setArticles={setArticles} />}
        />
        {topics.map((topic) => (
          <Route
            key={topic.slug}
            path={`/${topic.slug}`}
            element={<Topic topic={topic.slug} />}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
