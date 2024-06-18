import { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ArticlePage from './components/ArticlePage';
import { getTopics, getUsers } from './api';
import SignIn from './components/Signin';
import ProfilePage from './components/ProfilePage';

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
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
      <Header selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
      <Navbar topics={topics} setTopics={setTopics} />
      <Routes>
        <Route
          path="/:topic?"
          element={<Home articles={articles} setArticles={setArticles} />}
        />
        <Route
          path="/signin"
          element={
            <SignIn
              users={users}
              setSelectedUser={setSelectedUser}
            />
          }
        />
        <Route
          path="/profile"
          element={<ProfilePage selectedUser={selectedUser} />}
        />
        <Route
          path="/articles/:article_id"
          element={<ArticlePage selectedUser={selectedUser} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
