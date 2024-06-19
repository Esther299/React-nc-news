import { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import ArticlePage from './components/article/ArticlePage';
import { getUsers } from './api';
import SignIn from './components/signin/Signin';
import ProfilePage from './components/profile/ProfilePage';
import ErrorPage from './components/ErrorPage';

function App() {
  const [users, setUsers] = useState([]);
  const [articles, setArticles] = useState([]);
  

  useEffect(() => {
    getUsers()
      .then((fetchedUsers) => {
        setUsers(fetchedUsers);
      })
      .catch((err) => {
        console.error('Error fetching users:', err);
      });
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Navbar />
      <Routes>
        <Route
          path="/:topic?"
          element={<Home articles={articles} setArticles={setArticles} />}
        />
        <Route
          path="/signin"
          element={<SignIn users={users} />}
        />
        <Route
          path="/profile"
          element={<ProfilePage />}
        />
        <Route
          path="/articles/:article_id"
          element={<ArticlePage />}
        />
        <Route path="*" element={<ErrorPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
