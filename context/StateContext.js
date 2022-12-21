import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from 'react-hot-toast'

const Context = createContext()

// Used in pages/_app.js. Whatever is inside the State label will be passed as a children prop
export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false)
    const [cartItems, setCartItems] = useState(() => {
        if (typeof window !== "undefined") return localStorage.getItem('cartItems') !== null ? JSON.parse(localStorage.getItem('cartItems')) : []
      });
      const [totalPrice, setTotalPrice] = useState(() => {
        if (typeof window !== "undefined") return localStorage.getItem('totalPrice') !== null ? JSON.parse(localStorage.getItem('totalPrice')) : 0
      });
      const [totalQuantity, setTotalQuantity] = useState(() => {
        if (typeof window !== "undefined") return localStorage.getItem('totalQuantity') !== null ? JSON.parse(localStorage.getItem('totalQuantity')) : 0
      });
    const [qty, setQty] = useState(1)

    let foundProduct
    let index

    // useffect to implement localstorage (cart doesn't get empty after page refresh)
    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem('cartItems', JSON.stringify(cartItems))
            localStorage.setItem('totalPrice', JSON.stringify(totalPrice))
            localStorage.setItem('totalQuantity', JSON.stringify(totalQuantity))
        }
      }, [cartItems, totalPrice, totalQuantity]);
    
    // function that manages what happens when we add items into the cart
    const onAdd = (product, quantity) => {

        // check if the product selected is already on the cart
        const checkProductInCart = cartItems.find((item) => item._id === product._id)
        //update total price and quantity
        setTotalPrice((previousTotalPrice) => previousTotalPrice + product.price * quantity)
        setTotalQuantity((previousTotalQuantity) => previousTotalQuantity + quantity)

        // if product is already in the cart
        if (checkProductInCart) {

            // updates the quantity of that product in cart instead of adding it again
            const updatedCartItems = cartItems.map((cartProduct) => {
                if (cartProduct._id === product._id) {
                    return { ...cartProduct, quantity: cartProduct.quantity + quantity }
                }
            })

            setCartItems(updatedCartItems)

            // if the product selected doesn't already exists on the cart
        } else {
            product.quantity = quantity

            setCartItems([...cartItems, { ...product }])
        }

        toast.success(`${qty} ${product.name} añadido a la cesta.`)
    }

    // function to remove an item from the cart
    const onRemove = (product) => {
        foundProduct = cartItems.find((item) => item._id === product._id)
        const newCartItems = cartItems.filter((item, i) => item._id !== product._id)

        setTotalPrice((previousTotalPrice) => previousTotalPrice - foundProduct.price * foundProduct.quantity)
        setTotalQuantity((previousTotalQuantity) => previousTotalQuantity - foundProduct.quantity )
        setCartItems(newCartItems)
    }

    // function to update the cart data when clicking on the add or decrease buttons
    const toggleCartItemQuantity = (id, value) => {

        foundProduct = cartItems.find((item) => item._id === id)
        index = cartItems.findIndex((product) => product._id === id)
        const newCartItems = cartItems.filter((item, i) => item._id !== id)

        if (value === 'inc') {
            
            setCartItems([...newCartItems.slice(0, index), {...foundProduct, quantity: foundProduct.quantity + 1}, ...newCartItems.slice(index)])
            setTotalPrice((previousTotalPrice) => previousTotalPrice + foundProduct.price)
            setTotalQuantity(previousTotalQuantity => previousTotalQuantity + 1)

        } else if (value === 'dec') {

            // only decrement if there's more than 1 product. If there's 1, it can be deleted with the button on the right
            if (foundProduct.quantity > 1) {
                setCartItems([...newCartItems.slice(0, index), {...foundProduct, quantity: foundProduct.quantity - 1}, ...newCartItems.slice(index)])
                setTotalPrice((previousTotalPrice) => previousTotalPrice - foundProduct.price)
                setTotalQuantity(previousTotalQuantity => previousTotalQuantity - 1)
            }

        }
    }

    // function to increase the quantity of items in cart. 
    const increaseQty = () => {
        setQty((previousQty) => previousQty + 1)

    }

    // function to decrease the quantity of items in cart. It will not decrease if qty is equal to 0
    const decreaseQty = () => {
        setQty((previousQty) => {
            if (previousQty - 1 < 1) {
                return 1
            } else {
                return previousQty - 1
            }
        })
    }

    // sets an initial quantity of 1 so the current quantity does not persist when changing between items
    const initQuantity = () => {
        setQty(1);
 }

    // using a context we can access this values and functions from any single component
    return (
        <Context.Provider
            value={{
                showCart,
                cartItems,
                totalPrice,
                totalQuantity,
                qty,
                increaseQty,
                decreaseQty,
                onAdd,
                setShowCart,
                toggleCartItemQuantity,
                initQuantity,
                onRemove,
                setCartItems,
                setTotalPrice,
                setTotalQuantity
            }}
        >
            {children}
        </Context.Provider>
    )
}

// use the state as a hook
export const useStateContext = () =>
    useContext(Context)  
