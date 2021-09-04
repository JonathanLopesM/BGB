import {FiMail, FiX} from 'react-icons/fi';

import styles from './styles.module.scss';

export function SignInButton(){
  const isUserLoggedIn = true;


  return isUserLoggedIn ? (
    <button 
      type="button"
      className={styles.signInButton}
      >
      <FiMail color="#43b660" />
      Jonathan Lopes
      <FiX color="#737388" className={styles.closeIcon} />
    </button>
  ) : (
    <button 
      type="button"
      className={styles.signInButton}
      >
      <FiMail color="#b64343" />
      Sign in with Gmail
    </button>
  )
}