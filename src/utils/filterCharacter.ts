async function filterCharacter(query: string): Promise<Character[]> {
  const response = await fetch(`https://api.disneyapi.dev/character?name=${query}`);
  const data = await response.json();
  return Array.isArray(data.data) ? data.data : [data.data];
}

export default filterCharacter;