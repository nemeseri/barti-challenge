import { useEffect, useState } from 'react'
import { useNavigate, getRouteApi, useRouterState, useSearch } from '@tanstack/react-router'
import { useDebounce } from 'use-debounce'

// can come from env
const MIN_SEARCH_LENGTH = 3;

export default function SearchBar() {
  // const { query } = routeApi.useSearch()
  // TODO: add type safe search param here too
  const { query = '' } = useSearch({
    strict: false,
  });
  const [inputVal, setInputVal] = useState(query)
  const [inputDebounced] = useDebounce(inputVal, 500) // for a cleaner component
  const router = useRouterState()
  const navigate = useNavigate()

  useEffect(() => {
    setInputVal(query);
  }, [query]);

  useEffect(() => {
    // only navigate on homepage, which is the search page
    if (router.location.pathname !== '/' || (inputDebounced.length < MIN_SEARCH_LENGTH && inputDebounced !== '')) {
      return;
    }

    navigate({
      to: '/',
      search: () => ({ query: inputDebounced })
    })
  }, [inputDebounced]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (inputVal.length < MIN_SEARCH_LENGTH && inputDebounced !== '') {
      return;
    }

    navigate({
      to: '/',
      search: () => ({ query: inputVal })
    })
  }

  return (<form onSubmit={handleSubmit} role='search'>
    <input name='disneysearch' type="search" value={inputVal} onChange={(e) => setInputVal(e.target.value)} placeholder='Find a character...' />
  </form>)
}