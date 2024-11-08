import { useQuery } from '@tanstack/react-query'
import fetchCharacter from '../utils/fetchCharacter'
import getUpdated from '../utils/getUpdated'
import '../assets/character.css'

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

  if (status === 'error') {
    return <div className='character'><p className='error'>Error. Please try again later.</p></div>
  }

  if (!data || data.name === undefined) {
    return <div className='character'><p className='error'>Character not found.</p></div>
  }

  return (<div className='character'>
    <img src={data.imageUrl} alt={data.name} />

    <div>
      <h1>{data.name}</h1>

      <p>Last Updated {getUpdated(new Date(data.updatedAt).getTime())}</p>

      {data.films.length > 0 && (
        <>
          <h2>Featured Films</h2>
          <ul>{data.films.map(film => {
            return <li key={film}>{`"${film}"`}</li>
          })}</ul>
        </>
      )}

      {data.shortFilms.length > 0 && (
        <>
          <h2>Short Films</h2>
          <ul>{data.shortFilms.map(shortFilm => {
            return <li key={shortFilm}>{`"${shortFilm}"`}</li>
          })}</ul>
        </>
      )}

      {data.tvShows.length > 0 && (
        <>
          <h2>TV Shows</h2>
          <ul>{data.tvShows.map(tvShow => {
            return <li key={tvShow}>{`"${tvShow}"`}</li>
          })}</ul>
        </>
      )}

      <a href={data.sourceUrl} className='button primary-button' target='_blank'>Explore More Character Details</a>
    </div>
  </div>)
}