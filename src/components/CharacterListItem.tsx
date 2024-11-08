import { Link } from "@tanstack/react-router";
import '../assets/character-list-item.css'

type CharacterListItemProps = {
  character: Character;
}

export default function CharacterListItem({ character }: CharacterListItemProps) {
  let films = character.films.join(', ')
  let filmsTrunc

  if (films.length > 60) {
    filmsTrunc = films.substring(0, 72).trim().concat('...');
  }

  return (<Link to={`/characters/${character._id}`} className='character-list-item'>
    <h3>{character.name}</h3>
    <img src={character.imageUrl} alt={character.name} />
    {character.films.length > 0 && (
      <>
        <h4>Featured <span>Films</span></h4>
        <p title={films}>{filmsTrunc ?? films}</p>
      </>
    )}
    <div className='link'>View Profile</div>
  </Link>)
}