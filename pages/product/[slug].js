//Product details page displayed when we click in one product. slug is an unique identifier for a product. The file title between [] means that is dynamic. If we click to any product, it will render this component.
import React, { useState } from 'react'
import { client, urlFor } from '../../lib/client'
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { Product } from '../../components'
import { useStateContext } from '../../context/StateContext'

// receives as props the results to the queries
const ProductDetails = ({ product, products }) => {
    const [openDescription, setOpenDescription] = useState(false);
    const { image, name, details, price, completedescription } = product
    const [index, setIndex] = useState(0)
    // gets properties from the context
    const { decreaseQty, increaseQty, qty, onAdd, setShowCart } = useStateContext()

    // function that handles the buy now option, which adds the product to cart AND opens it
    const handleBuyNow = () => {
        onAdd(product, qty)
        setShowCart(true)
    }

    // function to toggle the description container, executed onclick
    const toggleDescription = () => {
        setOpenDescription(!openDescription);
    };

    return (
        <div>
            <div className='product-detail-container'>
                <div>
                    <div className='image-container'>
                        <img
                            src={urlFor(image && image[index])}
                            className='product-detail-image'
                        />
                    </div>
                    <div className='small-images-container'>
                        {image?.map((item, i) => (
                            <img
                                key={i}
                                src={urlFor(item)}
                                className={i === index ? 'small-image selected-image' : 'small-image'}
                                onMouseEnter={() => setIndex(i)}
                            />
                        ))}
                    </div>

                </div>
                <div className='product-detail-desc'>
                    <h1>{name}</h1>
                    <div className='reviews'>
                        <div>
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiOutlineStar />
                        </div>
                        <p>
                            (20)
                        </p>
                    </div>
                    <h4>Detalles: </h4>
                    <p>{details}</p>
                    <p className='price'>{price} €</p>
                    <div className='quantity'>
                        <h3>Cantidad:</h3>
                        <p className='quantity-desc'>
                            <span className='minus' onClick={decreaseQty}><AiOutlineMinus /></span>
                            <span className='num'>{qty}</span>
                            <span className='plus' onClick={increaseQty}><AiOutlinePlus /></span>
                        </p>
                    </div>
                    <div className='buttons'>
                        <button type='button' className='add-to-cart' onClick={() => onAdd(product, qty)}>Añadir a la cesta</button>
                        <button type='button' className='buy-now' onClick={handleBuyNow}>Comprar ahora</button>

                    </div>

                </div>

            </div>

            {/* Show the detailed description */}
            <div>
                <button className='collapsible' onClick={toggleDescription}>Todas las especificaciones</button>
                {openDescription && (
                    <div className="collapsible-content">
                        <div>{completedescription}</div>
                    </div>
                )}
            </div>


            {/* Show the related products carousel */}
            <div className='maylike-products-wrapper'>
                <h2>También te podría interesar:</h2>
                <div className='marquee'>
                    <div className='maylike-products-container track'>
                        {products.map((item) => (
                            <Product key={item._id} product={item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

// return the current slug property of the product clicked
export const getStaticPaths = async () => {
    const query = `*[_type == "product"] {
        slug {
            current
        }
    }
    `;
    const products = await client.fetch(query)

    const paths = products.map((product) => ({
        params: {
            slug: product.slug.current
        }
    }))
    return {
        paths,
        fallback: 'blocking'
    }
}

// getStaticProps is a prebult next.js function used to prerender the page at build time using the props returned. With the params {slug} we got access to the dynamic slug (different for every product)
export const getStaticProps = async ({ params: { slug } }) => {
    const productsQuery = `*[_type == "product" && slug.current == '${slug}'][0]`;
    const productsQuery2 = '*[_type == "product"]'
    const product = await client.fetch(productsQuery)
    const products = await client.fetch(productsQuery2)

    return {
        props: { product, products }
    }
}

export default ProductDetails