import { Link, useRouterState, useSearch } from '@tanstack/react-router'
import Logo from './Logo'
import SearchBar from './SearchBar'

type LayoutProps = {
  children: React.ReactElement;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouterState()

  return (
    <>
      <div id='layout' className={router.location.href.split('/')[1] || 'home'}>
        <header id='site-header'>
          <Link to='/' className='logo' search={{query: ''}}><Logo /></Link>
          <SearchBar />
          <Link to='/profile' className='user-profile'>User Profile</Link>
        </header>
        <main>
            {children}
        </main>
        <footer id='site-footer'>
          <Logo />
          <p>For educational use only. All characters and content are the property of Disney. This test is for private use and development testing only and should not be distributed for public consumption </p>
        </footer>
      </div>
    </>
  );
}