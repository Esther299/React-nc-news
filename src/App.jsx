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
  const [selectedUser, setSelectedUser] = useState(null);
  const [articles, setArticles] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  

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
      <Header selectedUser={selectedUser} setSelectedUser={setSelectedUser} setIsLoggedIn={setIsLoggedIn} />
      <Navbar />
      <Routes>
        <Route
          path="/:topic?"
          element={<Home articles={articles} setArticles={setArticles} />}
        />
        <Route
          path="/signin"
          element={<SignIn users={users} setSelectedUser={setSelectedUser} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/profile"
          element={<ProfilePage selectedUser={selectedUser} />}
        />
        <Route
          path="/articles/:article_id"
          element={<ArticlePage selectedUser={selectedUser} />}
        />
        <Route path="*" element={<ErrorPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
