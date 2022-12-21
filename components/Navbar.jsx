import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import {AiOutlineShopping} from 'react-icons/ai'
import {Cart} from './'
import { useStateContext } from '../context/StateContext'

const Navbar = () => {
  const { showCart, setShowCart, totalQuantity } = useStateContext()

  // local storage
  const [cartQuantity, setCartQuantity] = useState(0); 
  useEffect(() => setCartQuantity(totalQuantity), [totalQuantity]);

  return (
    <div className='navbar-container'>
      <p className='logo'>
        <Link href="/">Tecno-Tienda</Link>
      </p>
      <button type='button' className='cart-icon' onClick={() => setShowCart(true)}>
        <AiOutlineShopping/>
        <span className='cart-item-qty'>{cartQuantity}</span>
      </button>
      {/* Only shows the cart when is true */}
      {showCart && <Cart/>}
    </div>
  )
}

export default Navbar