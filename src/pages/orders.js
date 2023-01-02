import { useSession, getSession } from 'next-auth/react'
import React from 'react'
import db from '../../firebase';
import Header from '../components/Header'
import moment from 'moment'
import Order from '../components/Order';

function Orders({ orders }) {
    const { data: session } = useSession();

    console.log('The orders from serverSide props:>>>', orders);

    return (
        <div>
            <Header />
            <main className='max-w-screen-lg mx-auto p-10'>
                <h1 className='text-3xl border-b mb-2 pb-1 border-yellow-400'>You Orders</h1>
                {session ? (
                    <h2>{orders.length} Orders</h2>
                ) : (
                    <h2>Please sign in to see your orders.</h2>
                )}
                <div className='mt-5 space-y-4 '>
                    {orders?.map(order => (
                        <Order key={order.id}
                            id={order.id}
                            amount={order.amount}
                            amountShipping={0}
                            items={order.items}
                            timestamp={order.timestamp}
                        // images={}
                        />
                    ))}
                </div>
            </main>

        </div>
    )
}

export default Orders

//server side rendering: Before loading the page we'll fetch the orders from db
//Everything inside getServerSideProps is Nodejs
export async function getServerSideProps(context) {
    //const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

    //Get the users logged in credentials...
    const session = await getSession(context);
    //if there is no session, then return a default empty value
    if (!session) {
        return {
            props: {},
        };
    }
    // console.log('The session>>>', session)

    //Obtain the orders from the firebase db.
    const stripeOrders = await db
        .collection('amz2users')
        .doc(session.user.email)
        .collection('orders')
        .orderBy('timestamp', 'desc')
        .get();

    //Retrieve the orders data directly from Stripe 
    // //promise.all: Await until all promises are resolved, then proceed.
    // const orders = await Promise.all(
    //     stripeOrders.docs.map(async (order) => ({
    //         id: order.id,
    //         amount: order.data().amount,
    //         amountShipping: order.data().amount_shipping,
    //         images: order.data().images,
    //         timestamp: moment(order.data().timestamp.toDate()).unix(),
    //         items: (
    //             await stripe.checkout.sessions.listLineItems(order.id, {
    //                 limit: 100,
    //             })
    //         ).data,
    //     }))
    // );

    const orders = stripeOrders.docs.map((order) => ({
        id: order.id,
        amount: order.data().totalAmount,
        timestamp: moment(order.data().timestamp.toDate()).unix(),
        items: order.data().items,
    }))

    console.log('The orders1>>>', orders)

    return {
        props: {
            orders,
        }
    }
}