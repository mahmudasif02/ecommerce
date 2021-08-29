import React from 'react';
import { useStripe, useElements, CardElement} from '@stripe/react-stripe-js';

export let handleSubmit;

const SimpleCard = () => {

    const stripe = useStripe();
    const elements = useElements();

    handleSubmit = async () => {

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            return error
        } else {
            return paymentMethod;
        }
    };


    return (
        <>
        <CardElement
            options={{
                style: {
                    base: {
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                        color: '#aab7c4',
                        },
                    },
                    invalid: {
                        color: '#9e2146',
                    },
                    
                },
            }}
        />
        </>
    );
};

export default SimpleCard;