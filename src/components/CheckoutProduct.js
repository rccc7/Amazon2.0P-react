import { StarIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import React from 'react'
import { NumericFormat } from 'react-number-format';
import { useDispatch } from 'react-redux';
import { addToBasket, removeFromBasket } from '../slices/basketSlice'

function CheckoutProduct({ id, title, price, rating, description,
    category, image, hasPrime, }) {

    const dispatch = useDispatch();

    const addItemToBasket = () => {
        //add another unit of the same product to the basket.
        const product = {
            id,
            title,
            price,
            rating,
            description,
            category,
            image,
            hasPrime
        }
        //Push item into redux
        dispatch(addToBasket(product));
    }

    const removeItemFromBasket = () => {
        //Remove the item from redux
        //Here, instead of passing the whole prodcut as an argument, we
        //just pass the id inside an object as an argument.
        dispatch(removeFromBasket({ id }))
    }

    return (
        <div className='grid grid-cols-5'>
            <Image src={image} height={200} width={200} objectFit='contain' />
            {/* Middle section: This section spans across the 3 of five columns */}
            <div className='col-span-3 mx-5'>
                <p>{title}</p>
                <div className='flex'>
                    {Array(rating).fill().map((_, i) => (
                        <StarIcon key={i} className='h-5 text-yellow-500' />
                    ))}
                </div>
                <p className='text-xs my-2 line-clamp-3'>{description}</p>
                <NumericFormat value={price} prefix={'$'} />

                {hasPrime && (
                    <div className='flex items-center'>
                        <img
                            loading='lazy'
                            className='w-12'
                            src="https://upload.wikimedia.org/wikipedia/commons/e/e3/Amazon_Prime_Logo.svg"
                            alt=""
                            attribution='https://commons.wikimedia.org/wiki/File:Amazon_Prime_Logo.svg'
                        />
                        <p className='text-xs text-gray-500'>FREE Next-day Delivery</p>
                    </div>
                )}
            </div>
            {/* Right add/remove buttons */}
            <div className='flex flex-col space-y-2 my-auto justify-self-end'>
                <button className='button' onClick={addItemToBasket}>Add to Basket</button>
                <button className='button' onClick={removeItemFromBasket}>Remove from Basket</button>
            </div>
        </div>
    )
}

export default CheckoutProduct