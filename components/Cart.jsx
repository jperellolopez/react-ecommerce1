import React, { useRef } from 'react'
import Link from 'next/link'
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai'
import { TiDeleteOutline } from 'react-icons/ti'
import { toast } from 'react-hot-toast'
import { useStateContext } from '../context/StateContext'
import { urlFor } from '../lib/client'
import getStripe from '../lib/getStripe'

const Cart = () => {
  const cartRef = useRef()
  // receive and destructure the functions and values passed through the StateContext, so they can be used here
  const { totalPrice, totalQuantity, cartItems, setShowCart, toggleCartItemQuantity, onRemove } = useStateContext()

  // function to handle the Stripe payment. Treats the payment as an Stripe instance.
  const handleCheckout = async() => {

    // requires calling a getStripe function, created inside lib/getStripe.js
    const stripe = await getStripe()
    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItems)
    })

    if (response.statusCode === 500) {
      return
    } else {
      const data = await response.json()
      toast.loading('Redirigiendo...')
      stripe.redirectToCheckout({ sessionId: data.id })
    }

  }

  return (
    <div className='cart-wrapper' ref={cartRef}>
      <div className='cart-container'>
        {/* Show actual status (number of items in cart) on top */}
        <button
          className='cart-heading'
          type='button'
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className='heading' >Tu cesta de la compra</span>
          <span className='cart-num-items'>({totalQuantity == 1 ? (`${totalQuantity} artículo`) : (`${totalQuantity} artículos`)})</span>
        </button>

        {/* If cart is empty show a placeholder and a button to the frontpage */}
        {cartItems.length < 1 && (
          <div className='empty-cart'>
            <AiOutlineShopping size={150} />
            <h3>Tu cesta de la compra está vacía</h3>
            <Link href='/'>
              <button
                type='button'
                className='btn'
                onClick={() => setShowCart(false)}
              >
                Continua comprando
              </button>
            </Link>
          </div>
        )}

        {/* If there's products in cart, map the items and show information: img, name, price, quantity buttons and remove button */}
        <div className='product-container'>
          {cartItems.length >= 1 && cartItems.map((item, index) => (
            <div className='product' key={item._id}>
              <img
                className='cart-product-image'
                src={urlFor(item?.image[0])}
              />
              <div className='item-desc'>
                <div className='flex top'>
                  <h5>{item.name}</h5>
                  <h4>{item.price} €</h4>
                </div>
                <div className='flex bottom'>
                  <div>
                    <p className='quantity-desc'>
                      <span className='minus' onClick={() => toggleCartItemQuantity(item._id, 'dec')}><AiOutlineMinus /></span>
                      <span className='num'>{item.quantity}</span>
                      <span className='plus' onClick={() => toggleCartItemQuantity(item._id, 'inc')}><AiOutlinePlus /></span>
                    </p>
                  </div>
                  <button
                    type='button'
                    className='remove-item'
                    onClick={() => onRemove(item)}
                  >
                    <TiDeleteOutline />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Aggregated price for all the products in cart. Only shown if there's products on cart. */}
        {cartItems.length > 0 && (
          <div className='cart-bottom'>
            <div className='total'>
              <h3>Subtotal:</h3>
              <h3>{totalPrice} €</h3>
            </div>
            <div className='btn-container'>
              <button
                type='button'
                className='btn'
                onClick={handleCheckout}
              >
                Pagar con Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart