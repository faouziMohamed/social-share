import useSWR from 'swr';

export const fetcher = (url) => fetch(url).then((response) => response.json());

export function useUser(username = '') {
  const { data, mutate } = useSWR(`/api/users/${username || ''}`, fetcher);
  const user = data?.user;
  return [user, { mutate, loading: !data }];
}
export const useFetch = (url) => {
  const { data, error, mutate } = useSWR(url, fetcher);
  return [data, { loading: !data, error, mutate }];
};

export const useCurrentUserPosts = () => useFetch('/api/posts/user');
