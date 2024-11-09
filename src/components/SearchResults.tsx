import { useQuery } from '@tanstack/react-query'
import filterCharacter from '../utils/filterCharacter'
import CharacterListItem from './CharacterListItem'
import '../assets/character-list.css'
import CardSkeleton from './Skeletons'

type SearchResultsProps = {
  query: string;
}

export default function SearchResults({ query }: SearchResultsProps) {
  const { status, data } = useQuery({
    queryKey: ['search', query],
    queryFn: () => filterCharacter(query),
    staleTime: 1000*60*60*24,
    gcTime: 1000*60*60*24,
  });

  return (<div className='search-results'>
    <h2>Search Results - {query}</h2>
    
    {status === 'pending' && (<div className='character-list'>
      {[0,1,2,3].map(i => <CardSkeleton key={i} />)
    }</div>)}

    {data && !data.length && <p className='no-results'>No result. Please try a different name.</p>}

    {data && (
      <div className='character-list'>{data.map(char => {
        return <CharacterListItem key={char._id} character={char} />
      })}</div>)}
  </div>)
}