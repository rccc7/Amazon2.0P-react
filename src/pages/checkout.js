import { IdentificationIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CheckoutProduct from '../components/CheckoutProduct'
import Header from '../components/Header'
import { emptyBasket, selectItems, selectTotal } from '../slices/basketSlice'
import { NumericFormat } from 'react-number-format';
import { useSession } from 'next-auth/react'
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import Router from 'next/router'
const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY);

function Checkout() {
    const items = useSelector(selectItems)
    const total = useSelector(selectTotal)
    const { data: session, status } = useSession();

    const dispatch = useDispatch();

    //This would be used if we were implementing with stripe
    const createCheckoutSessionWithStripe = async () => {
        const stripe = await stripePromise;

        //Call backend to create checkout session...
        const checkoutSession = await axios.post("/api/create-checkout-session", {
            items: items,
            email: session.user.email,
        });

        //Redirect the user/customer to Stripe checkout
        const result = await stripe.redirectToCheckout({
            sessionId: checkoutSession.data.id
        })

        if (result.error) {
            alert(result.error.message);
        }
    }

    const checkoutAtBackend = async () => {

        //Call backend to create checkout session...
        const checkoutSession = await axios.post("/api/checkout-to-firebase", {
            items: items,
            email: session.user.email,
        });

        // alert(checkoutSession.data.id);
        console.log('the new generated id>>>', checkoutSession.data.id)
        if (checkoutSession.data.id) {
            //Empty the basket. We send the items as a parameter (action), but it is not necessary
            //since the parameter is not needed in redux function 
            dispatch(emptyBasket(items))
            //Redirect to success
            Router.push('/success')
        }
        else {
            alert('Sorry, there was a problem, Your purchase has not been registered. Please try again')
        }

    }

    return (
        <div className='bg-gray-100'>
            <Header />
            <main className='lg:flex max-w-screen-2xl mx-auto'>
                {/* Left */}
                <div className='flex-grow m-5 shadow-sm justify-center'>
                    <Image src="https://images.pexels.com/photos/5872349/pexels-photo-5872349.jpeg?cs=srgb&dl=pexels-max-fischer-5872349.jpg&fm=jpg"
                        width={1020}
                        height={250}
                        className='object-none'
                    // objectFit='contain'
                    />
                    <div className='flex flex-col p-5 space-y-10 bg-white'>
                        <h1 className='text-3xl border-b pb-4'>
                            {items.length ? 'Your Shopping Basket.' : 'Your Amazon Basket is empty.'}
                        </h1>
                        {/* When we map in react, we should always include a unique key. If we don't have a unique 
                        key we can use the index, but it is very necessary to include a unique key in lists  */}
                        {items.map((item, i) => {
                            return (<CheckoutProduct
                                key={i}
                                id={item.id}
                                title={item.title}
                                rating={item.rating}
                                price={item.price}
                                description={item.description}
                                category={item.category}
                                image={item.image}
                                hasPrime={item.hasPrime}
                            />)
                        })}
                    </div>
                </div>
                {/* Right */}
                <div className='flex flex-col bg-white p-10 shadow-md'>
                    {items.length && (
                        <>
                            <h2 className='whitespace-nowrap'>Subtotal: ({items.length} items):{' '}
                                <span className='font-bold'>
                                    <NumericFormat value={total} prefix='$' />
                                </span>
                            </h2>
                            <button
                                disabled={!session}
                                role='link'
                                onClick={checkoutAtBackend}
                                className={`button mt-2 ${!session &&
                                    "from-gray-300 to-gray-500 text-gray-300 cursor-not-allowed"
                                    }`}
                            >
                                {!session ? 'Sign in to checkout' : 'Proceed to checkout'}
                            </button>
                        </>
                    )}
                </div>
            </main>
        </div>
    )
}

export default Checkout