import React from 'react'
import Head from 'next/head'
import Navbar from './Navbar'
import Footer from './Footer'

// defines the structure of the app
const Layout = ({children}) => {
  return (
    <div className='layout'>
      <Head>
        <title>Tecno-Tienda Online</title>
      </Head>
      <header>
        <Navbar/>
      </header>
      <main className='main-container'>
        {children}
      </main>
      <footer>
        <Footer/>
      </footer>
    </div>
  )
}

export default Layout