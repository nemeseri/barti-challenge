import { useQuery } from '@tanstack/react-query';
import fetchCharacter from '../utils/fetchCharacter'

type CharacterProps = {
  characterId: number;
}

export default function Character({ characterId }: CharacterProps) {
  const { status, data } = useQuery({
    queryKey: ['character', characterId],
    queryFn: () => fetchCharacter(characterId),
    staleTime: 1000*60*60*24,
  });

  if (status === 'pending') {
    return <div className='character'><div>Loading...</div></div>
  }

  return (data && <div className='character'>
    <h1>{data.name}</h1>
    
    <img src={data.imageUrl} alt={data.name} />

    {data.films.length > 0 && (
      <>
        <h4>Featured Films</h4>
        <ul>{data.films.map(film => {
          return <li key={film}>{`"${film}"`}</li>
        })}</ul>
      </>
    )}

    {data.shortFilms.length > 0 && (
      <>
        <h4>Short Films</h4>
        <ul>{data.shortFilms.map(shortFilm => {
          return <li key={shortFilm}>{`"${shortFilm}"`}</li>
        })}</ul>
      </>
    )}

    {data.tvShows.length > 0 && (
      <>
        <h4>TV Shows</h4>
        <ul>{data.tvShows.map(tvShow => {
          return <li key={tvShow}>{`"${tvShow}"`}</li>
        })}</ul>
      </>
    )}

    <a href={data.sourceUrl} className='primary-button' target='_blank'>Explore More Character Details</a>
  </div>)
}