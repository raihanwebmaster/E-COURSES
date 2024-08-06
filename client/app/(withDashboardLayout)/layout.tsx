
"use client"
import React, { useEffect } from 'react'
import AdminSidebar from '../components/Admin/Sidebar/AdminSidebar'
import DashboardHero from '../components/Admin/DashboardHero'
import withAdmin from '../hooks/withAdmin'
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import socketIO from 'socket.io-client'
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_URL || ''
const socketId = socketIO(ENDPOINT, { transports: ['websocket'] })


const Layout = ({ children }: { children: React.ReactNode }) => {
    useEffect(() => {
        socketId.on('connection', () => {
            console.log("Connected to server")
        })
    }, [])
    return (
        <div>
            <div className='flex min-h-screen justify-evenly' >
                <div className='1500px:w-[16%] w-1/5 ' >
                    <AdminSidebar />
                </div>
                <div className='w-[80%]' >
                    <DashboardHero />
                    <BrowserView>
                        {children}
                    </BrowserView>
                </div>
            </div>
        </div>
    )
}

export default withAdmin(Layout)