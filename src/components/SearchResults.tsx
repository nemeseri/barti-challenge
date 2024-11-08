import { useQuery } from '@tanstack/react-query'
import filterCharacter from '../utils/filterCharacter'
import CharacterListItem from './CharacterListItem'

type SearchResultsProps = {
  query: string;
}

export default function SearchResults({ query }: SearchResultsProps) {
  const { status, data } = useQuery({
    queryKey: ['search', query],
    queryFn: () => filterCharacter(query),
    staleTime: 1000*60*60*24,
  });

  return (<section className='search-results'>
    <h2>Search Results - {query}</h2>
    {status === 'pending' && <div>Loading...</div>}
    {data && data.length < 1 && <p>No results</p>}
    {data && data.map(char => {
      return <CharacterListItem key={char._id} character={char} />
    })}
  </section>)
}