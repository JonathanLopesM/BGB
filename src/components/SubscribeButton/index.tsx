import styles from './styles.module.scss';

interface SubscribeButtonProps {//para pegar o priceId do index
  priceId: string;
}

export function SubscribeButton({ priceId } : SubscribeButtonProps) {
  return(
    <button
      type="button"
      className={styles.subscribeButton}
      >
      Subscribe Now
    </button>
  );

}