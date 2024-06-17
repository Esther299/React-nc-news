import axios from 'axios';

const newsApi = axios.create({
  baseURL: 'https://project-nc-news-8dvh.onrender.com/api',
});

export const getArticles = (topic) => {
  return newsApi.get('/articles', { params: { topic } }).then(({ data }) => {
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