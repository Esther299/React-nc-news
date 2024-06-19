import { useEffect } from 'react';
import { getArticles } from '../../api';

export function useFetchArticles(
  topic,
  sortBy,
  orderBy,
  setArticles,
  setIsLoading,
  setErrorMsg,
  setErrorCode
) {
  useEffect(() => {
    setIsLoading(true);
    getArticles(topic, { sort_by: sortBy, order_by: orderBy })
      .then((fetchedArticles) => {
        setArticles(fetchedArticles);
      })
      .catch(({ response: { data, status } }) => {
        setErrorMsg(data.msg);
        setErrorCode(status);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [topic, sortBy, orderBy, setIsLoading, setErrorCode, setErrorMsg]);
}
