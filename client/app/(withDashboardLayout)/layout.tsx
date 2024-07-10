
"use client"
import React, { useState } from 'react'
import AdminProtected from '../hooks/adminProtected'
import AdminSidebar from '../components/Admin/Sidebar/AdminSidebar'


const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <AdminProtected>
                <div className='flex min-h-screen' >
                    <div className='1500px:w-[16%] w-1/5 ' >
                        <AdminSidebar />
                    </div>
                    <div className='w-[85%]' >
                        {children}
                    </div>
                </div>
            </AdminProtected>
        </div>
    )
}

export default Layout