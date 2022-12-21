import '../styles/globals.css'
import React from 'react'
import { Layout } from '../components'
import { StateContext } from '../context/StateContext'
import { Toaster } from 'react-hot-toast'

// component "component" refers to all components, in this case they  are children of the Layout component. We pass the childrens of <Layout> with the {children} prop (used in Layout.jsx)
// wrapping the app between StateContext labels passes the data from the statecontext to every single component
export default function App({ Component, pageProps }) {
  return (
    <StateContext>
      <Layout>
        <Toaster/>
        <Component {...pageProps}  />
      </Layout>
    </StateContext>
  )
}
