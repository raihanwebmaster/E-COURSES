
"use client"
import React, { useState } from 'react'
import Header from '../components/Header'

const Layout = ({ children }: { children: React.ReactNode }) => {
    const [open, setOpen] = useState(false)
    const [activeItem, setActiveItem] = useState(0)
    const [route, setRoute] = useState("Login")
    return (
        <div>
            <Header open={open} setOpen={setOpen} activeItem={activeItem} route={route} setRoute={setRoute} />
            {children}
        </div>
    )
}

export default Layout