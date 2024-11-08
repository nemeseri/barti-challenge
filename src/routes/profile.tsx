import { createFileRoute, Link } from '@tanstack/react-router'
import { useCookies } from 'react-cookie'
import defaultUser from '../data/defaultUser'
import getAge from '../utils/getAge'
import getUpdated from '../utils/getUpdated'

export const Route = createFileRoute('/profile')({
  component: Profile,
  meta: () => [
    {
      title: 'User Profile | Disney Search',
    },
  ],
})

const USERCOOKIE = import.meta.env.VITE_USERCOOKIE

function Profile() {
  const [ cookies, setCookie ] = useCookies([USERCOOKIE]);
  let user;
  if (cookies[USERCOOKIE] === undefined) {
    setCookie(USERCOOKIE, defaultUser)
    user = defaultUser
  } else {
    user = cookies[USERCOOKIE];
  }

  return (
    <>
      <h1>{user.firstName} {user.lastName}</h1>
      <p>Last Updated <time>{getUpdated(user.updatedAt)}</time></p>
      <ul>
        <li>Age: {getAge(user.birthDate)}</li>
        <li>Location: {user.city}, {user.state}</li>
        <li>Favorite Disney Character: {user.favCharacter}</li>
        <li>Favorite Disney Movie: {user.favMovie}</li>
        <li>Favorite Disneyland: {user.favDisneyland}</li>
      </ul>
      <Link to='/profile-edit' className='primary-button'>Edit Profile</Link>
    </>
  )
}
