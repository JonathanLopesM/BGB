import styles from './header.module.scss';
import Link from 'next/link';
import { SignInButton } from '../signInButton/index';
import { ActiveLink } from '../activeLink';

export function Header(){
  return (
    
      <header className={styles.headerContainer}>
        <div className={styles.headerContent}>
          <Link href="/" passHref>
            <h1>BRAZIL GOLDEN BOYS</h1>
          </Link>
         <nav>
           <ActiveLink activeClassName={styles.active} href="/">
              <a >HOME</a>
           </ActiveLink>
           {/* <ActiveLink activeClassName={styles.active} href="#">
              <a>WHO WE ARE</a>
            </ActiveLink> */}
           <ActiveLink activeClassName={styles.active} href="/posts">
              <a >PLAYERS</a>
           </ActiveLink>
           {/* <ActiveLink activeClassName={styles.active} href="#">
              <a>CONTACT</a>
           </ActiveLink> */}
         <SignInButton/>
         </nav>
      </div>
      </header>
  )
}