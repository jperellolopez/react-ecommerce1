import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import {BsBagCheckFill} from 'react-icons/bs'
import { useStateContext } from '../context/StateContext'
import { runFireworks } from '../lib/utils'

// page that displays in case of successful payment

const Success = () => {

  const {setCartItems, setTotalPrice, setTotalQuantity} = useStateContext()

  // clear all states to be sure that all previous orders are deleted. Executes when the page is loaded []
  useEffect(() => {
    localStorage.clear()
    setCartItems([])
    setTotalPrice(0)
    setTotalQuantity(0)
    runFireworks()
  }, [])
  
  return (
    <div className='success-wrapper'>
        <div className='success'>
            <p className='icon'>
                <BsBagCheckFill/>
            </p>
            <h2>Gracias por tu compra</h2>
            <p className='email-msg'>Consulta tu email para ver los detalles sobre tu pedido </p>
            <p className='description'>
                Si tienes alguna pregunta sobre tu pedido, contacta con: 
                <a className='email' href="mailto:order@example.com">order@example.com</a>
            </p>
            <Link href='/'>
                <button type='button' width='300px' className='btn'>
                    Continuar comprando
                </button>
            </Link>
        </div>
    </div>
  )
}

export default Success

