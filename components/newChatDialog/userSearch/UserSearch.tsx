import { InlineSpinner } from '@/components/loadingSpinner/LoadingSpinner';
import { Input } from '@/components/ui/input';
import { Doc } from '@/convex/_generated/dataModel';
import { useUserSearch } from '@/hooks/useUserSearch';
import { cn } from '@/lib/utils';
import { useUser } from '@clerk/nextjs';
import { Mail, SearchIcon, UserIcon } from 'lucide-react';
import Image from 'next/image';

const UserSearch = ({
  onSelectUser,
  placeholder = 'Search Users by name or email',
  className,
}: {
  onSelectUser: (user: Doc<'users'>) => void;
  placeholder?: string;
  className?: string;
}) => {
  const { searchTerms, setSearchTerms, searchResults, isLoading } =
    useUserSearch();
  const { user } = useUser();
  // filter out the current user from the search results
  const filteredResults = searchResults.filter(
    (searchUser) => searchUser.userId !== user?.id
  );
  const handleSelectUser = (user: (typeof searchResults)[0]) => {
    onSelectUser?.(user);
    setSearchTerms(''); // clear search after selection
  };
  const clearSearch = () => {
    setSearchTerms('');
  };
  return (
    <div className={cn('w-full max-w-2xl mx-auto', className)}>
      {/* Search input*/}
      <div className='relative'>
        <SearchIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground' />
        <Input
          type='text'
          placeholder={placeholder}
          value={searchTerms}
          onChange={(e) => setSearchTerms(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSelectUser(searchResults[0]);
            }
          }}
          className='pl-10 pr-10 h-12 text-base'
        />
        {searchTerms && (
          <button
            onClick={clearSearch}
            className='absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        )}
      </div>

      {/* Search results */}
      {searchTerms.trim() && (
        <div
          className='mt-2 bg-card border border-border
        rounded-lg shadow-lg max-h-96 overflow-y-auto
        '>
          {isLoading ?
            <div className='p-4 text-center text-muted-foreground'>
              <div className='flex items-center justify-center space-x-2'>
                <InlineSpinner size='sm' />
                <span>Loading...</span>
              </div>
            </div>
          : filteredResults.length === 0 ?
            <div className='p-4 text-center text-muted-foreground'>
              <UserIcon className='w-8 h-8 mx-auto mb-2 opacity-50' />
              <p>No users results with name &quot;{searchTerms}&quot; found !</p>
            </div>
          : <div className='py-2'>
              {filteredResults.map((user) => (
                <button
                  key={user._id}
                  onClick={() => handleSelectUser(user)}
                  className={cn(
                    'w-full px-4 py-3 text-left hover:bg-accent transition-colors',
                    'border-b border-border last:border-b-0',
                    'focus:outline-none focus:bg-accent'
                  )}>
                  <div className='flex items-center space-x-3'>
                    {/* Avatar */}
                    <div className='relative'>
                      <Image
                        src={user.imageUrl || ''}
                        width={40}
                        height={40}
                        alt='avatar'
                        className='w-10 h-10 rounded-full'
                      />
                    </div>
                    {/* User info */}
                    <div className='flex-1 min-w-0'>
                      <div className='flex items-center space-x-2'>
                        <p className='font-medium text-foreground truncate'>
                          {user.name}
                        </p>
                      </div>
                      <div className="flex items-center space-x-1 mt-1">
                        <Mail className="w-4 h-4" />
                        <p className="text-muted-foreground text-sm truncate">{user.email}</p>
                      </div>
                    </div>
                     {/* Selection Indicator */}
                     <div className="flex-shrink-0">
                        <div className="h-2 w-2 bg-green-500 rounded-full opacity-0
                        group-hover:opacity-100 transition-opacity
                        "></div>
                     </div>
                  </div>
                </button>
              ))}
            </div>
          }
        </div>
      )}
    </div>
  );
};

export default UserSearch;
