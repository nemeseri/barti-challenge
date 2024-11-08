async function fetchCharacter(id: number): Promise<Character> {
  const response = await fetch(`https://api.disneyapi.dev/character/${id}`);
  const data = await response.json();
  return data.data;
}

export default fetchCharacter;