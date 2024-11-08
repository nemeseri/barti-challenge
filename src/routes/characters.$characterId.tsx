import { createFileRoute } from '@tanstack/react-router'
import Character from '../components/Character'
import FeaturedCharacters from '../components/FeaturedCharacters'

export const Route = createFileRoute('/characters/$characterId')({
  component: CharacterPage,
  meta: () => [
    {
      title: "Characters | Disney Search",
    },
  ],
})

function CharacterPage() {
  const { characterId } = Route.useParams()

  return (
    <>
      <Character characterId={Number(characterId)} />
      <FeaturedCharacters />
    </>
  )
}
