import { buffer } from 'micro'
import * as admin from 'firebase-admin'

//IMPORTANT: This file is intended to be used when STRIPE is enabled and it should
// called automatically by stripe after the successful execution of the 
//create-checkout-session.js file. By now, we're not
//implementing stripe, so it'll be replaced by checkout-to-firebase.js

//Secure a connetion to firebase from the backend
const serviceAccount = require('../../../permissions.json');
//In backend we need to be careful not to duplicate the initialization
const app = !admin.apps.length ? admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
}) :
    admin.app();

//Establish connection to stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const endPointSecret = process.env.STRIPE_SIGNING_SECRET;

const fulfillOrder = async (session) => {
    console.log('Fulfilling the order>>>', session);
    return app.firestore().collection('amz2users').
        doc(session.metadata.email).
        collection('orders').
        doc(session.id).set({
            amount: session.amount_total / 100,
            amount_shipping: session.total_details.amount_shipping / 100,
            images: JSON.parse(session.metatada.images),
            timestamp: admin.firestore.FieldValue.serverTimestamp
        }).then(() => {
            console.log(`SUCCESS: Order ${session.id} has been added to the datbase`);
        });
}

//Here, req stands for "request"
export default async (req, res) => {
    if (req.method === 'POST') {
        const requestBuffer = await buffer(req);
        const payload = requestBuffer.toString();
        const sig = req.headers['stripe-signature'];

        let event;

        //verify the EVENT posted came from stripe
        try {
            event = stripe.webhooks.constructEvent(payload, sig, endPointSecret);
        }
        catch (error) {
            console.log('Error>>', error.message);
            return res.status(400).send(`Webhook error: ${error.message}`);
        }

        //Handle he checkout.session.completed event.
        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;

            //Fulfill the order...
            //If the fulfillOrder succeeds then return a status of 200, 
            //otherwise return a 400 error status page
            return fulfillOrder(session)
                .then(() => res.status(200))
                .catch((err) => res.status(400)).send('Webhook error: ' + err.message);
        }
    }
};

//Disable the body parser in nextjs because when we handle a webhook 
//we don't want a body parser that is, we want the entire request as a 
//string rather than a parsed object
export const config = {
    api: {
        bodyParser: false,
        externalResolver: true,
    }
}