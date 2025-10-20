
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Doc } from '@/convex/_generated/dataModel';
import { useState } from 'react';
import { useDebounce } from './useDebounce';

export const useUserSearch = () => {
  const [searchTerms, setSearchTerms] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerms, 300);
  const searchResults = useQuery(
    api.users.searchUsers,
    debouncedSearchTerm.trim() ? { searchTerm: debouncedSearchTerm } : 'skip'
  );
  return { searchTerms, 
    setSearchTerms, 
    searchResults:(searchResults || []) as Doc<'users'>[] ,
    isLoading: searchResults === undefined && debouncedSearchTerm.trim() !== '' };
};
