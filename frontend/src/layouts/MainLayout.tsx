import React from 'react';
import Header from '../components/user/UserNavbar';
import Footer from '../components/user/UserFooter';
import { MainLayoutProps } from '../schema/component';

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div>
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    );
};

export default MainLayout;
