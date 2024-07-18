
"use client"
import React from 'react'
import AdminSidebar from '../components/Admin/Sidebar/AdminSidebar'
import DashboardHero from '../components/Admin/DashboardHero'
import withAdmin from '../hooks/withAdmin'
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';


const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <div className='flex min-h-screen' >
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