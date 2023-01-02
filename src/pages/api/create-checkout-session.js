const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

//IMPORTANT: This file is intended to be used when STRIPE is enabled. By now, we're not
//implementing stripe, so it'll be replaced by checkout-to-firebase.js

export default async (req, res) => {
    const { items, email } = req.body;
    console.log('the items>>>', items);
    console.log('the email>>>', email);

    //create the transformed items array which is an array
    //of items in the format that stripe requires
    const transformedItems = items.map((item) => ({
        description: item.description,
        quantity: 1,
        price_data: {
            currency: "usd",
            //This is: 1USD contains 100 cents
            unit_amount: item.price * 100,
            product_data: {
                name: item.title,
                images: [item.image]
            },
        },
    }));

    //create a session with the data to send to stripe in its required format:
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        //the shipping rates ids defined in stripe account
        shipping_rates: ['shr_1ItxE1GmPqch1y808q'],
        shipping_address_collection: {
            allowed_countries: ['GB', 'US', 'CA']
        },
        line_items: transformedItems,
        mode: 'payment',
        success_url: `${process.env.HOST}/success`,
        cancel_url: `${process.env.HOST}/checkout`,
        metadata: {
            email,
            //We use Json.stringify because we are sending accross the internet, 
            //and therefore, we need to convert the array into a string.
            images: JSON.stringify(items.map(item => item.image)),
        },
    })

    //We need to reply the request and the way that we do is by res.status()
    //200 is OK, 400 is not found, etc. In this case we are resplying with an ok response:
    res.status(200).json({ id: session.id });
}