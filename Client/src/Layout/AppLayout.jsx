import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const AppLayout = ({count}) => {
  return (
    <div className='flex flex-col min-h-screen'>
        <Header count={count}/>
        <main className='flex-grow'>
            <Outlet/>
        </main>
        <Footer/>
    </div>
  )
}

export default AppLayout