import { useSearchParams } from 'react-router-dom';

export function useArticleSearchParams(
  defaultSortBy = 'created_at',
  defaultOrderBy = 'desc'
) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortByParam = searchParams.get('sort_by') || defaultSortBy;
  const orderByParam = searchParams.get('order_by') || defaultOrderBy;

  const setSortBy = (sortBy) => {
    searchParams.set('sort_by', sortBy);
    setSearchParams(searchParams);
  };

  const setOrderBy = (orderBy) => {
    searchParams.set('order_by', orderBy);
    setSearchParams(searchParams);
  };

  return {
    sortBy: sortByParam,
    orderBy: orderByParam,
    setSortBy,
    setOrderBy,
  };
}
