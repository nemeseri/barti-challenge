import { createFileRoute, stripSearchParams } from '@tanstack/react-router'
import SearchResults from '../components/SearchResults'
import FeaturedCharacters from '../components/FeaturedCharacters'
import CharacterList from '../components/CharacterList';

type CharacterSearch = {
  query: string;
}
export const Route = createFileRoute('/')({
  component: HomeComponent,
  validateSearch: (search: Record<string, unknown>): CharacterSearch => {
    // validate and parse the search param into a typed state
    return {
      query: (search.query as string) || '',
    }
  },
  search: {
    middlewares: [stripSearchParams({
      query: ''
    })]
  }
})

// These IDs could come from env, config, DB or CMS?
const defaultCharacterIds = import.meta.env.VITE_HOME_CHARACTERS.split(',');

function HomeComponent() {
  const { query } = Route.useSearch()

  return (
    <>
      {query && <SearchResults query={query} />}
      {!query && (
        <CharacterList ids={defaultCharacterIds} />
      )}
      <FeaturedCharacters />
    </>
  )
}
