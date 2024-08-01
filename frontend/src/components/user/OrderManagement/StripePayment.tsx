import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51Piw5m09257pZrXUfjcIjUSkygdRNTNDHFqlBmMhALAMzXeZIhrA9dUspnnBGWaIFg9rOsSuYVHcFMAO1qsiRvXu00FVZc6hg5');

export default function App() {
  const options = {
    clientSecret: '{{CLIENT_SECRET}}',
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  );
};