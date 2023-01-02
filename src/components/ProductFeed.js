import React from 'react'
import Product from './Product'

function ProductFeed({ products }) {
    return (
        // when we hit the medium screen (768px) then the grid will be applied and the content
        //will split in two columns; then when the screen reaches large screen size (1024px)
        //then the grid will split in three columns and so on
        //md:-mt-52 -> Make the content of the product feed overlap the banner when screen size reaches 768px
        <div className='grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto'>
            {/* <h1>Products goe here...</h1> */}
            {
                //products.slice(0,4) is used to divide the feed in two parts so we can put an image
                //in the middle.

                // Whitout destructuring:
                // products.map(product => (
                //     <p>{product.title}</p>
                // ))
                // Destructuring:. To check the properties, check the json at: https://fakestoreapi.com/products
                products.slice(0, 4).map(({ id, title, price, description, category, image }) => (
                    // whenever we do any mapping in react, it's critical to include a "key" value.
                    // That basically tells react which element is different from another
                    <Product
                        key={id}
                        id={id}
                        title={title}
                        price={price}
                        description={description}
                        category={category}
                        image={image}
                    />
                ))
            }
            {/* md:col-span-full -> grid-column: 1 */}
            <img className='md:col-span-full h-[250px] w-[100%] object-none px-4' src="https://images.pexels.com/photos/5662862/pexels-photo-5662862.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />

            {/* The second part of the sliced products 
            This product in specific will occupy two spans when the scrreen reaches medium size:*/}
            <div className='md:col-span-2'>
                {
                    products.slice(4, 5)
                        .map(({ id, title, price, description, category, image }) => (
                            <Product
                                key={id}
                                id={id}
                                title={title}
                                price={price}
                                description={description}
                                category={category}
                                image={image}
                            />
                        ))
                }
            </div>

            {/* Show the rest of the products */}
            {
                products.slice(5, products.length).map(({ id, title, price, description, category, image }) => (
                    // whenever we do any mapping in react, it's critical to include a "key" value.
                    // That basically tells react which element is different from another
                    <Product
                        key={id}
                        id={id}
                        title={title}
                        price={price}
                        description={description}
                        category={category}
                        image={image}
                    />
                ))
            }
        </div>
    )
}

export default ProductFeed