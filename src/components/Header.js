import React from 'react'
import Image from 'next/image';
import {
    Bars3Icon,
    MagnifyingGlassIcon,
    ShoppingCartIcon,
} from '@heroicons/react/24/solid'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { selectItems } from '../slices/basketSlice';

function Header() {

    const { data: session, status } = useSession();
    const router = useRouter();
    //Obtain the items from redux basket slice
    const items = useSelector(selectItems)
    console.log('the items>>>', items);
    // session.user
    return (
        //This will make the header stand always at the top of the page: className='top-0 sticky z-50'
        <header className='top-0 sticky z-50'>
            <div className='bg-yellow-300 py-2'>
                <h1 className='font-medium text-sm text-center lg:animate-bounce hover:animate-none'><span className='font-bold'>IMPORTANT:</span> Please, consider this is only a demo app intended to test and demonstrate the creation of ReactJS components to make an UI similar to Amazon. The products listed are just mock articles retrieved from an API. <span className='font-bold'>THIS IS NOT THE OFFICIAL AMAZON PAGE</span></h1>
            </div>
            {/* Top nav 
            Here, bg-amazon_blue-light was manually defined in the next.config.js file*/}
            <div className='flex items-center bg-amazon_blue-light p-1 flex-grow py-2'>
                {/* sm:flex-grow-0: Mobile first: do not grow after the screen size exceeds mobile screen resolution (640px)  */}
                <div className='mt-2 flex items-center flex-grow  sm:flex-grow-0'>
                    {/* The nextjs image tag is better because among other things it compresses the image so the loading times are faster */}
                    <Image
                        onClick={() => router.push('/')}
                        src='https://www.nicepng.com/png/full/16-167642_amazon-logo-amazon-logo-white-text.png'
                        width='150'
                        height={40}
                        // Keep the aspect ratio
                        objectFit="contain"
                        className='cursor-pointer'
                        attribution='https://www.nicepng.com/ourpic/u2q8a9u2o0o0i1t4_amazon-logo-amazon-logo-white-text/'
                        title="Amazon Logo White Text is high quality PNG picture material, Public domain, via https://www.nicepng.com/"
                    />
                </div>
                {/* Search: by default on mobile be hidden, and only shoy in big screens
                flex-grow: take as much space as it can */}
                <div className='hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-yellow-400  hover:bg-yellow-500'>
                    {/* flex-shrink doesn't do anything aparently, but sonny says it is to shrink the 
                    textfield when needed.
                     focus:outline-none -> remove the blue border around the textfield when focused */}
                    <input className='p-2 h-full w-6 flex-grow rounded-l-md focus:outline-none' type="text" />
                    <MagnifyingGlassIcon className='h-12 p-4' />
                </div>
                {/* Right 
                space-x-6 -> Space between the items inside the div*/}
                <div className='flex items-center text-xs space-x-6 text-white whitespace-nowrap mx-6'>
                    <div className='link'>
                        <p onClick={!session ? signIn : signOut}>
                            {session ? `Hello ${session.user.name}` : 'Sign In'}
                        </p>
                        {/* when the screen size is medium or above then increase the text size to sm */}
                        <p className='font-extrabold md:text-sm'>Account & Lists</p>
                    </div>
                    <div onClick={() => router.push('/orders')} className='link'>
                        <p>Returns</p>
                        <p className='font-extrabold md:text-sm'>& Orders</p>
                    </div>
                    {/* Here, we use the position "relative" because whe want to
                     put the circle with the number in a position relative to its normal position  */}
                    <div onClick={() => router.push('/checkout')} className='relative link flex items-center'>
                        {/* absolute positioning without the parent being relative means it's
                        absolute to the entire page. That is the reason we make the
                         parent div (👆🏻) be relative so that this span will be absolute to the parent 
                         md:right-10 moves the circled number next to the basket on medium screens and above.*/}
                        <span className='absolute top-0 right-0 md:right-10 h-4 w-4 
                        bg-yellow-400 text-center rounded-full 
                        text-black font-bold'>
                            {items.length}
                        </span>
                        {/* h-10 -> height:40px */}
                        <ShoppingCartIcon className='h-10' />
                        {/* hidden md:inline -> Hide the "Basket"  text by default, and only show it once we
                        reach the medium screen or above
                        mt-2: Margin top: 2 to give space to the circled number*/}
                        <p className='hidden md:inline font-extrabold md:text-sm mt-2'>Basket</p>
                    </div>
                </div>
            </div>

            {/* Bottom nav */}
            <div className='flex items-center space-x-3 p-2 pl-6 bg-amazon_blue-light text-white text-sm'>
                <p className='link flex items-center'>
                    <Bars3Icon className='h-6 mr-1' />
                    All
                </p>
                <p className='link'>Prime Video</p>
                <p className='link'>Amazon Business</p>
                <p className='link'>Today's Deals</p>
                <p className='link hidden lg:inline-flex'>Electronics</p>
                <p className='link hidden lg:inline-flex'>Food & Grocery</p>
                <p className='link hidden lg:inline-flex'>Prime</p>
                <p className='link hidden lg:inline-flex'>Buy Again</p>
                <p className='link hidden lg:inline-flex'>Shopper Toolkit</p>
                <p className='link hidden lg:inline-flex'>Health & Personal Care</p>
            </div>
        </header>
    )
}

export default Header