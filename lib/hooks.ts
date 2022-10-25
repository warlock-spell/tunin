import useSWR from 'swr'
import fetcher from './fetcher'

// "Use" keyword in front of hook is neccessary
export const useMe = () => {
  const { data, error } = useSWR("/me", fetcher);

  return {
    user: data,
    isLoading: !data && !error,
    isError: error,
  };
};

export const usePlaylist = () => {
  const { data, error } = useSWR("/playlist", fetcher);
  console.log('data inside usePlaylist', data);
  console.log('error inside usePlaylist', error);
  return {
    playlists: (data as any) || [],
    isLoading: !data && !error,
    isError: error,
  };
};