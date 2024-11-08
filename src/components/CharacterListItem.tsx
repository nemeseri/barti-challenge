import { Link } from "@tanstack/react-router";

type CharacterListItemProps = {
  character: Character;
}

export default function CharacterListItem({ character }: CharacterListItemProps) {
  return (<div className='character-list-item'>
    <h3>{character.name}</h3>
    <img src={character.imageUrl} alt={character.name} />
    {character.films.length > 0 && (
      <>
        <h4>Featured Films</h4>
        <ul>{character.films.map(film => {
          return <li key={film}>{`"${film}"`}</li>
        })}</ul>
      </>
    )}
    <Link to={`/characters/${character._id}`}>View Profile</Link>
  </div>)
}