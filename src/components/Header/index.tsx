import styles from './header.module.scss';
import Link from 'next/link';
import { SignInButton } from '../signInButton/index';

export function Header(){
  return (
    
      <header className={styles.headerContainer}>
        
        <div className={styles.headerContent}>

        
          <Link href="/" passHref>
            <h1>BRAZIL GOLDEN BOYS</h1>
          </Link>
         <nav>
           <Link href="/">HOME</Link>
           <Link href="#">WHO WE ARE</Link>
           <Link href="#">PLAYERS</Link>
           <Link href="#">CONTACT</Link>
         <SignInButton/>
         </nav>
      </div>
      </header>
  )
}