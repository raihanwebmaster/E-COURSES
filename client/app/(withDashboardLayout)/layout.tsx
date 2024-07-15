
"use client"
import React from 'react'
import AdminSidebar from '../components/Admin/Sidebar/AdminSidebar'
import DashboardHero from '../components/Admin/DashboardHero'
import withAdmin from '../hooks/withAdmin'


const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <div className='flex min-h-screen' >
                <div className='1500px:w-[16%] w-1/5 ' >
                    <AdminSidebar />
                </div>
                <div className='w-[85%]' >
                    <DashboardHero />
                    {children}
                </div>
            </div>
        </div>
    )
}

export default withAdmin(Layout)