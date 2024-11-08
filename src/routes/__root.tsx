import { useEffect, ReactNode } from 'react'
import { Outlet, createRootRoute, useMatches, ScrollRestoration } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CookiesProvider } from 'react-cookie';
import Layout from '../components/Layout'
import '../assets/main.css'

const TITLE = 'Disney Search'

export const Route = createRootRoute({
  component: RootComponent,
})

const queryClient = new QueryClient()

function RootComponent() {
  return (
    <Meta>
      <Layout>
        <QueryClientProvider client={queryClient}>
          <CookiesProvider defaultSetOptions={{ path: '/' }}>
            <ScrollRestoration />
            <Outlet />
          </CookiesProvider>
        </QueryClientProvider>
      </Layout>
    </Meta>
  );
}

function Meta({ children }: { children: ReactNode }) {
  const matches = useMatches()
  const meta = matches.at(-1)?.meta?.find((meta) => meta.title)

  useEffect(() => {
    document.title = [meta?.title, TITLE].filter(Boolean).join(' · ');
  }, [meta])

  return children
}
