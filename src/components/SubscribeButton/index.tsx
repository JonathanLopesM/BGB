import { signIn, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';
import styles from './styles.module.scss';

interface SubscribeButtonProps {//para pegar o priceId do index
  priceId: string;
}

export function SubscribeButton({ priceId } : SubscribeButtonProps) {
  const [session] = useSession();
  const router = useRouter()

  async function handleSubscribe(){
    if(!session){
      signIn('auth0')
      return;
    }
    if (session.activeSubscription) {
      router.push('/posts');
      return;
    }

    //logged in, so let's create a checkout session
    try{
      const response = await api.post('/subscribe');

      const { sessionId } = response.data;

      const stripe = await getStripeJs()

      await stripe.redirectToCheckout({ sessionId })

    } catch(err) {
      alert(err.message)
    }
  }



  return(
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={() => handleSubscribe()}
      >
      Subscribe Now
    </button>
  );

}