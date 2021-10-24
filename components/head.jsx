import Head from 'next/head';
import { Fragment } from 'react';

export default function HeadMeta({ pageData }) {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const paths = pageData.path || [];
  const ogImg = `${BASE_URL}/images/logo/favicon-512.png`;
  return (
    <Head>
      <title>{pageData.title}</title>
      <meta charSet='UTF-8' />
      <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <meta name='keywords' content={pageData.keywords} />
      <meta name='description' content={pageData.description} />
      <meta name='color-scheme' content='dark light' />
      <meta name='theme-color' content='#4285f4' />
      {paths.map((path, index) => (
        <Fragment key={`${index}canonical-ogurl`}>
          <link
            rel='canonical'
            href={`${BASE_URL}/${path}`}
            key={`canonical${index}`}
          />
          <meta
            property='og:url'
            content={`${BASE_URL}/${path}`}
            key={`ogurl${index}`}
          />
        </Fragment>
      ))}
      <meta property='og:title' content={pageData.title} />
      <meta property='og:description' content={pageData.description} />
      <meta property='og:image' content={ogImg} />
      <meta property='og:type' content='website' />
      <meta property='og:locale' content='en_US' />
    </Head>
  );
}
