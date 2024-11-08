import CharacterList from './CharacterList'

// These IDs could come from a higher level in context
// or simply in the form of params.
const defaultFeaturedCharacterIds = import.meta.env.VITE_FEATURED.split(',');

export default function FeaturedCharacters() {
  return (<aside className='featured-characters'>
    <h2>Featured Characters!</h2>
    <CharacterList ids={defaultFeaturedCharacterIds} />
  </aside>)
}