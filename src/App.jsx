import { useState, useEffect, useContext } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Navbar from './components/navbar/Navbar';
import Home from './components/home/Home';
import ArticlePage from './components/article/ArticlePage';
import { getUsers, getTopics } from './api';
import SignIn from './components/signin/Signin';
import ProfilePage from './components/profile/ProfilePage';
import ErrorPage from './components/ErrorPage';
import { UserContext } from './contexts/UserContext';
import Footer from './components/footer/Footer';

function App() {
  const [users, setUsers] = useState([]);
  const [articles, setArticles] = useState([]);
  const { setErrorMsg, setErrorCode } = useContext(UserContext);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getUsers()
      .then((fetchedUsers) => {
        setUsers(fetchedUsers);
      })
      .catch(({ response: { data, status } }) => {
        setErrorMsg(data.msg);
        setErrorCode(status);
      });
  }, [setErrorCode, setErrorMsg]);

  useEffect(() => {
    getTopics()
      .then((fetchedTopics) => {
        setTopics(fetchedTopics);
      })
      .catch(({ response: { data, status } }) => {
        setErrorMsg(data.msg);
        setErrorCode(status);
      });
  }, [setErrorCode, setErrorMsg]);

  return (
    <BrowserRouter>
      <Header />
      <Navbar topics={topics} />
      <Routes>
        <Route
          path="/:topic?"
          element={<Home articles={articles} setArticles={setArticles} />}
        />
        <Route path="/signin" element={<SignIn users={users} />} />
        <Route
          path="/profile"
          element={
            <ProfilePage
              topics={topics}
              articles={articles}
              setArticles={setArticles}
            />
          }
        />
        <Route path="/articles/:article_id" element={<ArticlePage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
