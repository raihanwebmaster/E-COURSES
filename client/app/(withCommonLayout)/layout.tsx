
"use client"
import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer/Footer'

const Layout = ({ children }: { children: React.ReactNode }) => {
    const [open, setOpen] = useState(false)
    const [route, setRoute] = useState("Login")
    return (
        <div>
            <Header open={open} setOpen={setOpen} route={route} setRoute={setRoute} />
            {children}
            <Footer/>
        </div>
    )
}

export default Layout