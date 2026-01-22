import React from 'react'
import Sidebar from './sidebar'
import { Button } from '../ui/button';
import { LogOut } from 'lucide-react';

const Layout = ({ title, description, children }) => {
    const handleLogout = () => {
        Cookies.remove("isLoggedIn");
        Cookies.remove("user");
        window.location.href = "/login";
    };
    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="border-b border-border">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className="text-4xl font-bold">{title}</h1>
                            <p className="text-lg text-muted-foreground mt-2">
                                {description}
                            </p>
                        </div>
                        <Button onClick={handleLogout} variant="outline" className='hidden'  >
                            <LogOut className="h-4 w-4 mr-2" />
                            Sign Out
                        </Button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 pt-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <Sidebar />

                    {/* Main Content */}
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Layout
