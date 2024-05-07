import React from 'react';
import Head from 'next/head';

// import shareImage from '@assets/images/ogShare.jpg';

const Meta = () => {
  return (
    <Head>
      <title key="title">Be Your Own Boss</title>
      <meta key="x-ua" httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />

      <link
        rel="manifest"
        href="/site.webmanifest"
        crossOrigin="use-credentials"
      />

      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />
    </Head>
  );
};

export default Meta;
