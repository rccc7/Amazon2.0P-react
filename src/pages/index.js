import Head from "next/head";
import Header from "../components/Header";
import Banner from '../components/Banner'
import ProductFeed from "../components/ProductFeed";
import { getSession } from "next-auth/react";

// here, props are obtained from the server side function down bellow after this function:
//getServerSideProps(context)
// export default function Home({products}) {...} is the destructured version of:
// export default function Home(props) {...}
export default function Home({ products }) {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazn CLONE 2.0</title>
      </Head>

      {/* <h1>Hey RCCC Followers 😎🔥🍫</h1> */}
      {/* header component */}
      <Header />

      {/*max-w-screen-2xl: Set the max width to 1536px  
      mx-auto: not only set the margins left and rigth to auto, but also it 
      centers the component
      */}
      <main className="max-w-screen-2xl mx-auto">
        {/* Banner */}
        <Banner />
        {/* Product Feed */}
        {/* Here, we pass the products obtained from the server side */}
        <ProductFeed products={products} />
        {/* <p>{products}</p> */}
      </main>
    </div>
  );
}

// Implement server side rendering: Which basically is: first render the stuff (images from other links,
//api calls, etc) in the server side, and after that send the page to the user's browser
export async function getServerSideProps(context) {
  //If we want to get rid of the glitch that whenever we refresh the page the text
  //of the current user's name in the Header at the top of the page
  //shows sign In instead of the user's name for a few moments even when the
  // user is already logged in we will get the session right here (in the server side)
  //and send it as part of the props argument to the component.
  const session = await getSession(context);
  // Obtain the products json in the server side:
  const products = await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json()
  );

  // Here we return any props we define, in this case we are returning the just fetched
  //products
  return {
    props: {
      products,
      session
    }
  }
}

// GET >>> https://fakestoreapi.com/products