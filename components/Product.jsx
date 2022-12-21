import React from 'react'
import Link from 'next/link'
import { urlFor } from '../lib/client'
import { useStateContext } from '../context/StateContext'

// receives a product prop from pages/index.js and destructures its properties (so there's no longer need to specify object.property)
const Product = ({product: {image, name, slug, price, details}}) => {
  const {initQuantity} = useStateContext()
  return (
    <div>{ /* slug acts as an identifier. When we click into a product, generates a link with this slug and renders the [slug].js component */ }
      <Link href={`/product/${slug.current}`}> 
        <div className='product-card'>
          {/* by default, shows the first image of the product */}
          <img
            src={urlFor(image && image[0])}
            width={250}
            height={250}
            className='product-image'
            onClick={initQuantity}
          />
          <p className='product-name'>{name}</p>
          <p className='product-price'>{price} €</p>
        </div>
      </Link>
    </div>
  )
}

export default Product