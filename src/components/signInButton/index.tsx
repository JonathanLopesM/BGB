import {FiMail, FiX} from 'react-icons/fi';

import { signIn, signOut, useSession } from 'next-auth/client'

import styles from './styles.module.scss';

export function SignInButton(){
  const [session] = useSession();


  return session ? (
    console.log(session),
    <button 
      type="button"
      className={styles.signInButton}
      onClick={() => signOut()}
      >
      <FiMail color="#43b660" />
      {session.user.name}
      <FiX color="#737388" className={styles.closeIcon} />
    </button>
  ) : (
    <button 
      type="button"
      className={styles.signInButton}
      onClick={() => signIn('cognito')}
      >
      <FiMail color="#b64343" />
      Sign in with Gmail
    </button>
  )
}