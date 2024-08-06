
"use client"
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer/Footer'
import socketIO from 'socket.io-client'

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_URL || ''
const socketId = socketIO(ENDPOINT, { transports: ['websocket'] })

const Layout = ({ children }: { children: React.ReactNode }) => {
    const [open, setOpen] = useState(false)
    const [route, setRoute] = useState("Login")
    useEffect(() => {
        socketId.on('connection', () => {
            console.log("Connected to server")
        })
    }, [])
    return (
        <div>
            <Header open={open} setOpen={setOpen} route={route} setRoute={setRoute} />
            {children}
            <Footer />
        </div>
    )
}

export default Layout