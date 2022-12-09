import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';
import s from './Layout.module.css';

export const Layout = () => (
  <>
    <Header />
    <main className={s.mainSection}>
      <Outlet />
    </main>
  </>
);
