import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import { deleteArticleById, getArticles } from "../../api";
import ArticleForm from "./articleForm/ArticleForm";
import styles from "./ProfilePage.module.css";

function ProfilePage({ topics }) {
  const {
    selectedUser,
    isLoading,
    setIsLoading,
    errorMsg,
    setErrorMsg,
    errorCode,
    setErrorCode,
  } = useContext(UserContext);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState("");
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    getArticles()
      .then((fetchedArticles) => {
        setArticles(fetchedArticles);
        setIsLoading(false);
      })
      .catch((error) => {
        setErrorMsg(error.response.data.msg);
        setErrorCode(error.response.status);
        setIsLoading(false);
      });
  }, []);

  const handleDelete = (article_id) => {
    setErrorMsg("");
    setErrorCode(null);
    setIsDeleting(true);
    deleteArticleById(article_id)
      .then(() => {
        setIsDeleting(false);
        setDeleteMessage("Article deleted successfully!");
        setArticles((currentArticles) =>
          currentArticles.filter((article) => article.article_id !== article_id)
        );
        setTimeout(() => {
          setDeleteMessage("");
        }, 5000);
      })
      .catch((error) => {
        setIsDeleting(false);
        if (error.response) {
          setErrorMsg(error.response.data.msg);
          setErrorCode(error.response.status);
        } else {
          setErrorMsg("An error occurred while deleting the article.");
          setErrorCode(null);
        }
      });
  };

  if (isLoading) {
    return <p className="loading">Loading...</p>;
  }

  if (errorCode || errorMsg) {
    return (
      <p className="error">
        {errorCode}: {errorMsg}
      </p>
    );
  }
  if (!selectedUser) {
    return (
      <div className={styles.noUserProfile}>
        <h1>Your Profile</h1>
        <div className={styles.profileContainer}>
          <h3>Username:</h3>
          <p>none</p>
          <h3>Name:</h3>
          <p>none</p>
          <img
            className={styles.noUserImage}
            src="default-profile-picture.svg.png"
            alt="default avatar"
          />
        </div>
      </div>
    );
  }

  const userArticles = articles.filter(
    (article) => article.author === selectedUser.username
  );

  return (
    <div className={styles.profile}>
      <h1>Your Profile</h1>
      <div className={styles.profileContainer}>
        <h3>Username:</h3>
        <p>{selectedUser.username}</p>
        <h3>Name:</h3> <p>{selectedUser.name}</p>
        <img
          className={styles.profileImage}
          src={selectedUser.avatar_url}
          alt={`${selectedUser.username}'s avatar`}
        />
      </div>
      <div className={styles.articlesContainer}>
        <h4>Your articles:</h4>
        <ul className={styles.list}>
          {userArticles.map((article) => (
            <li key={article.article_id} className={styles.articleCard}>
              <h2>
                {article.title}
                <br />
                <span>
                  {" "}
                  Posted: {article.created_at.substring(0, 10)} at{" "}
                  {article.created_at.substring(11, 19)}
                </span>
              </h2>
              {deleteMessage && <p></p>}
              <button
                onClick={() => handleDelete(article.article_id)}
                disabled={isDeleting}
                className={styles.deleteButton}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
              {errorCode && (
                <p className={styles.error}>
                  {errorCode}: {errorMsg}
                </p>
              )}
            </li>
          ))}
        </ul>
        {deleteMessage && (
          <p className={styles.deleteMessage}>{deleteMessage}</p>
        )}
      </div>
      <div className={styles.formContainer}>
        <ArticleForm topics={topics} setArticles={setArticles} />
      </div>
    </div>
  );
}

export default ProfilePage;
