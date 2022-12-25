import React from 'react';
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  ViberIcon,
  ViberShareButton,
} from 'react-share';

export const socials = (url) => [
  {
    button: (
      <TelegramShareButton url={url}>
        <TelegramIcon round size="40px" />
      </TelegramShareButton>
    ),
    name: 'Telegram',
  },
  {
    button: (
      <TwitterShareButton url={url}>
        <TwitterIcon round size="40px" />
      </TwitterShareButton>
    ),
    name: 'Twitter',
  },
  {
    button: (
      <FacebookShareButton url={url}>
        <FacebookIcon round size="40px" />
      </FacebookShareButton>
    ),
    name: 'Facebook',
  },
  {
    button: (
      <ViberShareButton url={url}>
        <ViberIcon round size="40px" />
      </ViberShareButton>
    ),
    name: 'Viber',
  },
  {
    button: (
      <LinkedinShareButton url={url}>
        <LinkedinIcon round size="40px" />
      </LinkedinShareButton>
    ),
    name: 'LinkedIn',
  },
];
