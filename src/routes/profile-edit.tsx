import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useCookies } from 'react-cookie'
import defaultUser from '../data/defaultUser'
import '../assets/profile-edit.css'

export const Route = createFileRoute('/profile-edit')({
  component: ProfileEdit,
})

const USERCOOKIE = import.meta.env.VITE_USERCOOKIE

function getBirthDate(ts: EpochTimeStamp) {
  const d = new Date(ts)
  return d.toISOString().split('T')[0]
}

function ProfileEdit() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>()
  const navigate = useNavigate()

  const [cookies, setCookie] = useCookies([USERCOOKIE])
  let user
  if (cookies[USERCOOKIE] === undefined) {
    setCookie(USERCOOKIE, defaultUser)
    user = defaultUser
  } else {
    user = cookies[USERCOOKIE]
  }

  const onSubmit: SubmitHandler<User> = (data) => {
    data.updatedAt = new Date().getTime()
    data.birthDate = new Date(data.birthDate).getTime()
    setCookie(USERCOOKIE, data)
    navigate({ to: '/profile' });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='profile-edit'>
      <div className='form-row'>
        <div className='form-field required'>
          <label htmlFor='profileFirstName' className='required'>First Name</label>
          <input
            id='profileFirstName'
            defaultValue={user.firstName}
            {...register('firstName', { required: true })}
            aria-invalid={errors.firstName ? 'true' : 'false'} 
          />
        </div>

        <div className='form-field required'>
          <label htmlFor='profileLastName' className='required'>Last Name</label>
          <input
            id='profileLastName'
            defaultValue={user.lastName}
            {...register('lastName', { required: true })}
            aria-invalid={errors.lastName ? 'true' : 'false'} 
          />
        </div>
      </div>

      <div className='form-row'>
        <div className='form-field required'>
          <label htmlFor='profileBirthDate' className='required'>Birth Date</label>
          <input
            id='profileBirthDate'
            type='date'
            defaultValue={getBirthDate(user.birthDate)}
            {...register('birthDate', { required: true })}
            aria-invalid={errors.birthDate ? 'true' : 'false'} 
          />
        </div>
      </div>

      <div className='form-row'>
        <div className='form-field'>
          <label htmlFor='profileCity'>City</label>
          <input id='profileCity' defaultValue={user.city} {...register('city')} />
        </div>

        <div className='form-field'>
          <label htmlFor='profileState'>State</label>
          <input
            id='profileState'
            defaultValue={user.state}
            {...register('state')}
          />
        </div>
      </div>

      <div className='form-field-100'>
        <label htmlFor='profileFavCharacter'>Favorite Disney Character</label>
        <input
          id='profileFavCharacter'
          defaultValue={user.favCharacter}
          {...register('favCharacter')}
        />
      </div>

      <div className='form-field-100'>
        <label htmlFor='profileFavMovie'>Favorite Disney Movie</label>
        <input
          id='profileFavMovie'
          defaultValue={user.favMovie}
          {...register('favMovie')}
        />
      </div>

      <div className='form-field-100'>
        <label htmlFor='profileFavDisneyland'>Favorite Disneyland</label>
        <input
          id='profileFavDisneyland'
          defaultValue={user.favDisneyland}
          {...register('favDisneyland')}
        />
      </div>

      <div className='button-row'>
        <button type='submit' className='button primary-button'>Update Profile</button>
        <Link to='/profile' className='button secondary-button'>
          Cancel
        </Link>
      </div>
    </form>
  )
}
