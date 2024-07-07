import { useContext, useState } from "react";
import { UserContext } from "../../../contexts/UserContext";
import styles from "./ArticleForm.module.css";
import { postArticle } from "../../../api";

function ArticleForm({ topics, setArticles }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [topic, setTopic] = useState("");
  const [image, setImage] = useState("");
  const [imageInputVisible, setImageInputVisible] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { selectedUser, errorMsg, setErrorMsg, errorCode, setErrorCode } =
    useContext(UserContext);

  const handleSubmit = (event) => {
    event.preventDefault();

    setErrorMsg("");
    setErrorCode(null);
    if (selectedUser) {
      setIsSubmitting(true);
      const author = selectedUser.username;
      postArticle({
        title,
        author,
        body,
        topic,
        article_img_url: image,
      })
        .then((newComment) => {
          setArticles((currentComments) => [newComment, ...currentComments]);
          setTitle("");
          setBody("");
          setTopic("");
          setImage("");
          setImageInputVisible(true);
          setIsSubmitting(false);
        })
        .catch(({ response: { data, status } }) => {
          setErrorMsg(data.msg);
          setErrorCode(status);
          setIsSubmitting(false);
        });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "title") {
      setTitle(value);
    } else if (name === "body") {
      setBody(value);
    } else if (name === "topic") {
      setTopic(value);
    } else if (name === "article_img_url") {
      setImage(value);
    }
  };

  const handleImageToggle = () => {
    setImageInputVisible(!imageInputVisible);
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className={styles.formContainer}>
      <h3>Add New Article:</h3>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="body">Body:</label>
          <textarea
            id="body"
            aria-multiline="true"
            name="body"
            value={body}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="topic">Topic:</label>
          <select
            id="topic"
            name="topic"
            value={topic}
            onChange={handleChange}
            required
          >
            <option value="">Select a topic</option>
            {topics.map((topic) => (
              <option key={topic.slug} value={topic.slug}>
                {capitalizeFirstLetter(topic.slug)}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="article_img_url">Image URL:</label>
          {imageInputVisible ? (
            <>
              <input
                type="text"
                id="article_img_url"
                name="article_img_url"
                value={image}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={handleImageToggle}
                className={styles.uploadButton}
              >
                Upload
              </button>
            </>
          ) : (
            <>
              <img
                src={image}
                alt="Article Preview"
                className={styles.imagePreview}
              />
              <button
                type="button"
                onClick={handleImageToggle}
                className={styles.changeButton}
              >
                Change
              </button>
            </>
          )}
        </div>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
        {errorCode && (
          <p className={styles.error}>
            {errorCode}: {errorMsg}
          </p>
        )}
      </form>
    </div>
  );
}
export default ArticleForm;
