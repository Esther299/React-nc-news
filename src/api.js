import axios from 'axios';

const newsApi = axios.create({
  baseURL: 'https://project-nc-news-8dvh.onrender.com/api',
});

export const getArticles = (topic = '', { sort_by = '', order_by = '' } = {}) => {
  return newsApi
    .get('/articles', { params: { topic, sort_by, order_by } })
    .then(({ data }) => {
      return data.articles;
    });
};

export const getTopics = () => {
  return newsApi.get('/topics').then(({ data }) => {
    return data.topics;
  });
};

export const getArticleById = (article_id) => {
  return newsApi.get(`/articles/${article_id}`).then(({ data }) => {
    return data.article;
  });
};

export const getCommentsByArticleId = (article_id) => {
  return newsApi.get(`/articles/${article_id}/comments`).then(({ data }) => {
    return data.comments;
  });
};

export const patchArticleById = (article_id, num) => {
  const patchBody = { inc_votes: num };
  return newsApi
    .patch(`/articles/${article_id}`, patchBody)
    .then(({ data }) => {
      return data.article;
    });
};

export const postComment = (article_id, { author, body }) => {
  return newsApi
    .post(`/articles/${article_id}/comments`, { author, body })
    .then(({ data }) => {
      return data.comment;
    });
};

export const getUsers = () => {
  return newsApi.get('/users').then(({ data }) => {
    return data.users;
  });
};

export const getUserByUsername = (username) => {
  return newsApi.get(`/users/${username}`).then(({ data }) => {
    return data.user;
  });
};

export const deleteCommentById = (comment_id) => {
  return newsApi.delete(`/comments/${comment_id}`);
};

export const patchCommentById = (comment_id, num) => {
  const patchBody = { inc_votes: num };
  return newsApi
    .patch(`/comments/${comment_id}`, patchBody)
    .then(({ data }) => {
      return data.comment;
    });
};

export const postArticle = ({ author, title, body, topic, article_img_url }) => {
  return newsApi
    .post(`/articles/`, { author, title, body, topic, article_img_url })
    .then(({ data }) => {
      return data.article;
    });
};

export const deleteArticleById = (article_id) => {
  return newsApi.delete(`/articles/${article_id}`);
};