import React from 'react'
import {Product, FooterBanner, HeroBanner} from '../components'
import { client } from '../lib/client'

const Home = ({productsData, bannerData}) => {
  return (
    <> {/* If bannerdata exists, pass the first element to the HeroBanner component */}
    <HeroBanner heroBanner={bannerData?.length && bannerData[0]} /> 
    
     <div className='products-heading'>
      <h2>Más vendidos</h2>
      <p>Altavoces de distintos tipos</p>
     </div>

     <div className='products-container'> {/* Loop over the product. Provide the entire object to the product component as a prop */}
      {productsData?.map((product) => 
        <Product key={product._id} product={product}/> 
      )}
     </div>
        {/* If bannerData exists, pass the first element to the component */}
     <FooterBanner footerBanner={bannerData && bannerData[0]}/>
    </>
  )
}

// whenever we fetch data from an api, use the getServerSideProps async function to pre-render the information 
export const getServerSideProps = async () => {
  const productsQuery = '*[_type == "product"]'; // sanity query to fetch all(*) elements of type "product"
  const productsData = await client.fetch(productsQuery)

  const bannerQuery = '*[_type == "banner"]'; 
  const bannerData = await client.fetch(bannerQuery)

  return {
    props: { productsData, bannerData} // returns an object with the queries results as props, that we can destructure in the top
  }
}

export default Home