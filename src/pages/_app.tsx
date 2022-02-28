
import type { AppProps } from 'next/app';
import { Header } from '../components/Header';
import { Provider as NextAuthProvider } from 'next-auth/client';

import '../styles/global.scss'
import { GetStaticPaths } from 'next';

function MyApp({ Component, pageProps }: AppProps) {
  return(
  <NextAuthProvider session={pageProps.session}>
    <Header/>
    <Component {...pageProps} />
  </NextAuthProvider>
  )
}
export default MyApp

export const getStaticPaths:GetStaticPaths = async () =>{
  return {
          paths: [{
            params: {
              id: '/'
            }
          },
            {
              params: {
                id: '/posts'
                }           
              },
              {
                params: {
                  id: '/posts/preview/[id]'
                  }           
                },
                {
                  params: {
                    id: '/posts/[id]'
                    }           
                  }],
          fallback: true
      }
}
