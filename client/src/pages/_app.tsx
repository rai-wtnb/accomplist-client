import React from 'react';
import Head from 'next/head';
import { DefaultSeo } from 'next-seo';
import '../styles/tailwind.css';

function MyApp({ Component, pageProps }) {
  const DEFAULT_SEO = {
    title: 'AccompList',
    description: 'rai watanabe. Portfolio.',
    openGraph: {
      type: 'website',
      locale: 'ja',
      title: 'AccompList',
      description: 'rai watanabe. Portfolio',
      site_name: 'AccompList',
      images: [
        {
          url: '',
          width: 800,
          height: 600,
          alt: 'AccompList',
        },
      ],
    },
    twitter: {
      handle: '@mmuu_kkuu',
      cardType: 'summary_large_image',
    },
  };

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>AccompList</title>
      </Head>
      <DefaultSeo {...DEFAULT_SEO} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
