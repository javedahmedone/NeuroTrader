// Layout.js
import React from 'react';
import Header from './Header/Header';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <Header />
      <div className="main-content">
        <Outlet /> {/* Renders the nested route */}
      </div>
    </>
  );
};

export default Layout;
