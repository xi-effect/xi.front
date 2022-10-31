import React, { ReactNode } from 'react';
import Head from 'next/head';

type LayoutPagesT = {
  title?: string;
  noIndex?: boolean;
  children: ReactNode;
};

const LayoutPages = ({ title, noIndex = false, children }: LayoutPagesT) => {
  const hostname =
    typeof window !== 'undefined' && window.location.hostname ? window.location.hostname : '';

  return (
    <>
      <Head>
        <title>{`xi.effect ${title ? `| ${title}` : ''}`}</title>
        {(noIndex || hostname.includes('netlify')) && <meta name="robots" content="noindex" />}
      </Head>
      {children}
    </>
  );
};

export default LayoutPages;
