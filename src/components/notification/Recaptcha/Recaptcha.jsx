/* eslint-disable no-undef */
import React from 'react';
import PropTypes from 'prop-types';
import ReCAPTCHA from 'react-google-recaptcha';
import s from './Recaptcha.module.css';

export const Recaptcha = ({ isShowed, setIsShowed, setRecaptchaToken }) => {
  const recaptchaOnChange = (value) => {
    setRecaptchaToken(value);
    setIsShowed(false);
  };
  return (
    isShowed && (
      <div className={s.container}>
        <div className={s.background} />
        <ReCAPTCHA
          sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
          onChange={recaptchaOnChange}
        />
      </div>
    )
  );
};

Recaptcha.propTypes = {
  isShowed: PropTypes.string,
  setIsShowed: PropTypes.func,
  setRecaptchaToken: PropTypes.func,
};
