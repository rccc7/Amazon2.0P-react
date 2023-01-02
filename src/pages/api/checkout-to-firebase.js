// import { buffer } from 'micro'
import * as admin from 'firebase-admin'
//IMPORTANT: This is the checkout to firebase only version that only saves the order
//to the database and does not involve stripe.

//Secure a connetion to firebase from the backend
const serviceAccount = require('../../../permissions.json');
//In backend we need to be careful not to duplicate the initialization
const app = !admin.apps.length ? admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
}) :
    admin.app();

const fulfillOrder = async (items, email) => {
    let totalAmount = items.reduce((prev, curr) => prev + curr.price, 0);
    let generatedId;
    let doc = await app.firestore().collection('amz2users').
        doc(email).collection('orders')
        .add(
            {
                totalAmount: totalAmount,
                timestamp: admin.firestore.FieldValue.serverTimestamp(),
                items: items
            }).then((obj) => {
                console.log(`SUCCESS: Order ${obj.id} has been added to the datbase`);
                generatedId = obj.id;
            }).catch(err => {
                console.log('Error when trying to add a new document to firebase: ', err);
                generatedId = null;
            });

    console.log('The doc>>>', doc)

    return generatedId;

}

//Here we'll save to the database the order from backend.
export default async (req, res) => {
    const { items, email } = req.body;

    let generatedId = await fulfillOrder(items, email)

    //We need to reply the request and the way that we do is by res.status()
    //200 is OK, 400 is not found, etc. In this case we are resplying with an ok response:
    if (generatedId)
        res.status(200).json({ id: generatedId });
    else
        res.status(400).json({ id: undefined })

    // res.status(400).json({ id: undefined })

}