import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css";

function Banner() {
    return (
        // We are defining the class as realtive because we are going to something 
        // absolutely positioned inside this div (the carousel). So we have to make the 
        //container relative otherwise the item could fly to the top of the screen
        <div className='relative'>
            {/* Here, we'll make the gradient effect 
            bg-gradient-to-t' ->Background gradient from the bottom to the top
            */}
            <div className='absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20' />
            <Carousel
                autoPlay
                infiniteLoop
                showStatus={false}
                showIndicators={false}
                showThumbs={false}
                interval={5000}
            >
                <div>
                    {/* loading="lazy" -> It makes the loading for the component lazy loading by default */}
                    <img loading='lazy' src="https://images.pexels.com/photos/2529787/pexels-photo-2529787.jpeg?cs=srgb&dl=pexels-artem-beliaikin-2529787.jpg&fm=jpg&w=1920&h=1280" alt="" attribution="https://www.pexels.com/photo/photo-of-discount-sign-2529787/" />
                </div>

                <div>
                    <img loading='lazy' src="https://images.pexels.com/photos/5624997/pexels-photo-5624997.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" attribution="https://www.pexels.com/photo/macbook-pro-beside-red-and-white-sale-card-5624997/" />
                </div>

                <div>
                    <img loading='lazy' src="https://images.pexels.com/photos/3944394/pexels-photo-3944394.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" attribution="https://www.pexels.com/photo/silver-imac-with-apple-keyboard-and-magic-mouse-3944394/" />
                </div>

                <div>
                    <img loading='lazy' src="https://images.pexels.com/photos/5632386/pexels-photo-5632386.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" attribution="https://www.pexels.com/photo/top-view-of-silver-macbook-beside-a-shopping-cart-and-black-friday-sale-signage-5632386/" />
                </div>
            </Carousel>
        </div>
    )
}

export default Banner