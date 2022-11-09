import React from "react";
import { Link } from "react-router-dom";
import s from "./index.module.css";

function Logo() {
  return (
    // <Link className={s.link} to="/">
    <a className={s.link} href="/">
      Learn
      <span className={s.logo}>Me</span>
    </a>
    // </Link>
  );
}

export default Logo;
