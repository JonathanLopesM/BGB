
import Head from 'next/head';
import Image from 'next/image';

import styles from './home.module.scss';

import { GetStaticProps } from 'next';
import { SubscribeButton } from '../components/SubscribeButton';


import { stripe } from '../services/stripe';

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}
export default function Home({product} : HomeProps) {
  return (
    <>
      <Head>
        <title>Home | BGB</title>
      </Head>
        <Image src='/players.svg' width={1920} height={385} alt= "home-picture"></Image>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <p>Hey, Welcome to <span> Brazil Golden Boys!</span></p>
          <h1>Meet the young promises of <span>Brazi</span><span>lian</span> football.</h1>
          <span>Players in growing development, but with low passing cost.</span>
          <p>Brazil is a five-time world cup champion federation, being a great storehouse of soccer stars, the country always renews its stars and new promises of world soccer emerge and quickly start to be worth a center of dollar players.</p>
          <p>Here you can check first hand what is the feeling player that is emerging, their characteristics, their moves and their values.</p>
          <p>
            Every week a new athlete with a promising future. <br />
            Get access to all publications <br />
            <span>For {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId}/>
          </section>
          <Image src='/playerHome.svg' width={335} height={669} alt= "playerhome"></Image>
      </main>
    </>
  )
}

 const getStaticProps: GetStaticProps = async () => {
  //exec on server
  const price = await stripe.prices.retrieve('price_1JV5MiGSlFYV1BqOYgoOR73c', {
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
