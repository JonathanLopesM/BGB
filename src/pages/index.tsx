
import Head from 'next/head';
import Image from 'next/image';

import styles from './home.module.scss';

import { GetStaticProps } from 'next';
import { SubscribeButton } from '../components/SubscribeButton';


import { stripe } from '../services/stripe';


import Aos from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from 'react';

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}
export default function Home({product} : HomeProps) {
    useEffect(()=>{
        Aos.init({ duration: 1200})
    },[])

  return (
    <>
      <Head>
        <title>Home | BGB</title>
        <meta name="description" content="Meet the young promises of Brazilian soccer."></meta>
        
      </Head>
        <Image data-aos='fade-down' src='/players.avif' width={1920} height={385} alt= "brazilian players"></Image>
      <main data-aos='fade-right' className={styles.contentContainer}>
        <section className={styles.hero}>
          <p>Hey, Welcome to <span> Brazil Golden Boys!</span></p>
          <h1>Meet the young promises of <span>Brazilian</span> soccer.</h1>
          <span>Fast-growing players with high probability of profit in the near future.</span>
          <p>Brazil is the five-time world champion federation, being a great storehouse of soccer stars, the country always renews its stars and new promises of world soccer emerge and are quickly worth thousands of dollars.</p>
          <p>Here you can get to know firsthand the young people that are emerging. See their performance, their in-game characteristics and their contractual values.</p>
          <p>
            EVERY WEEK A NEW ATHLETE WITH A PROMISING FUTURE.<br />
            Get access to all publications <br />
            <span>For {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId}/>
          </section>
          <Image data-aos='fade-up' src='/playerHome.avif' width={335} height={669} alt= "playerhome"></Image>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  //exec on server
  const price = await stripe.prices.retrieve(process.env.STRIPE_PRICE, {
    expand: ['product']
  })


  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100),
  };

    return {
      props: {
        product
      },
      revalidate: 60 * 60 * 24, //24hours
    }

}
