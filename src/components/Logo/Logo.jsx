import React from 'react';
import { Link } from 'react-router-dom';
import s from './Logo.module.css';

export const Logo = () => (
  <Link className={s.link} to="/">
    Learn
    <span className={s.logo}>Me</span>
  </Link>
);
