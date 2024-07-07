import { ThemeProvider } from '@/app/utils/theme-provider'
import { store } from '@/redux/store'
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import { Toaster } from 'react-hot-toast'
import { Provider } from "react-redux"


const Providers = ({ children }: { children: React.ReactNode }) => {
    return (

        <Provider store={store} >
            <SessionProvider>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem  >
                    {children}
                    <Toaster position="top-center" reverseOrder={false} />
                </ThemeProvider>
            </SessionProvider>
        </Provider >
    )
}

export default Providers