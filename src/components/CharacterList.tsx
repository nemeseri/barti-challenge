import { useQueries } from '@tanstack/react-query'
import fetchCharacter from '../utils/fetchCharacter'
import CharacterListItem from './CharacterListItem'
import '../assets/character-list.css'

type CharacterListProps = {
  ids: number[];
}

export default function CharacterList({ ids }: CharacterListProps) {
  const results = useQueries({ 
    queries: ids.map((id) => ({
      queryKey: ['featured', id],
      queryFn: () => fetchCharacter(id),
      staleTime: 1000*60*60*24,
      cacheTime: 1000*60*60*24,
    }))
   })

  return (
    <div className='character-list'>
      {results.map((result, idx) => {
        if (result.status === 'pending') {
          return <span key={idx}>Loading...</span>
        }
        if (result.data) {
          return <CharacterListItem key={result.data._id} character={result.data} />
        }
      })}
    </div>)
}