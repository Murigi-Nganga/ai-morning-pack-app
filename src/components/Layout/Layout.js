//The generic layout of the application
import React from 'react'
import SideDrawer from './SideDrawer/SideDrawer'
import TopBar from './TopBar/TopBar'

export default function Layout({ children }) {

    return (
        <div>
            <TopBar />
            <SideDrawer />
            <div>
                {children}
            </div>
        </div>
    )

}
