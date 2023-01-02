import Image from 'next/image'
import React from 'react'
import { useState } from 'react'
import { StarIcon } from '@heroicons/react/24/solid'
// import Currency from 'react-currency-formatter';
import { NumericFormat } from 'react-number-format';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToBasket } from '../slices/basketSlice';

// Constant variables for the stars
const MAX_RATING = 5;
const MIN_RATING = 1;

function Product({ id, title, price, description, category, image }) {
    const dispatch = useDispatch();

    // Generate a random number for the stars.
    // const [rating] = useState(
    //     Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
    // )
    const [rating, setRating] = useState(0);
    const [hasPrime, setHasPrime] = useState(1)

    //Use useEffect hook in order to prevent the "Hydration failed because the initial UI 
    //does not match what was rendered on the server." error. 
    //For mor information about the error and its solution see
    //https://nextjs.org/docs/messages/react-hydration-error
    useEffect(() => {
        setHasPrime(Math.random() < 0.5);
        setRating(Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING);
    }, [])

    const addItemToBasket = () => {
        //The object product which is received as a parameter
        const product = {
            id, title, price, rating, description, category, image, hasPrime
        };

        //Sending the product as an action to the Redux store... Basically the basket slice.
        //This product is being passed as the payload inside addToBasket action in basketSlice reducer
        dispatch(addToBasket(product))
    }

    return (
        <div className='relative flex flex-col m-5 bg-white z-30 p-10'>
            <p className='absolute top-2 right-2 text-xs italic text-gray-400'>{category}</p>
            <Image src={image} height={200} width={200} objectFit='contain' />
            <h4 className='my-3'>{title}</h4>
            <div className='flex'>
                {/* Here, map(_,i), means that we don't care about the initial value "-",
                we just care about the index "i"
                NOTE: The underscore symbol is just another name of variable, it is not a special
                character according to: https://www.thoughtco.com/and-in-javascript-2037515 */}
                {Array(rating).
                    fill()
                    .map((_, i) => (
                        //here key ={i} is to avoid the warnng message: "Warning: Each child in a list should have a unique "key" prop."
                        <StarIcon className='h-5 text-yellow-500' key={i} />
                    ))}
            </div>
            {/* line-clamp-2: The text will be clamped to two lines. If there are more
            text it'll be truncated and then three dots will be displayed at the end of the second line */}
            <p className='text-xs my-2 line-clamp-2'>{description}</p>
            <div className='mb-5'>
                {/* currency by default is USD dollars. 
                There is no need to define it; however, for demostration purposes 
                we are re-defining it */}
                {/* <Currency quantity={price} currency="USD" /> */}
                <NumericFormat value={price} prefix={'$'} />
                {/* {price} */}
            </div>

            {/* Only If it hasPrime === true, then render */}
            {hasPrime && (
                // -mt-5: is the negative of mt-5 and generates a negative margin top
                <div className='flex items-center space-x-2 -mt-5'>
                    <img className='w-12' src="https://upload.wikimedia.org/wikipedia/commons/e/e3/Amazon_Prime_Logo.svg" alt="" attribution='https://commons.wikimedia.org/wiki/File:Amazon_Prime_Logo.svg' />
                    <p className='text-xs text-gray-500'>FREE Next-Day Delivery</p>
                </div>
            )}

            {/* button is our personalized class defined in global.css file */}
            <button
                onClick={addItemToBasket}
                className='mt-auto button'>Add to Basket</button>
        </div>
    )
}

export default Product