import * as React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import createEmotionServer from '@emotion/server/create-instance';
import createEmotionCache from '../store/createEmotionCache';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* PWA primary color */}
          {/* <meta name="theme-color" content={theme.palette.primary.main} /> */}
          <meta charSet="utf-8" />
          <meta
            name="Keywords"
            content="xi.effect, effect, Образованиие, Эффект, Кси Эффект, Xi Effect, Effect"
          />
          <meta name="yandex-verification" content="5896c9df498c0cd0" />
          <meta
            name="google-site-verification"
            content="VAN7yVAfRqd5NWFpUJlz0MVL1wcv0mdhDY-16-d48-U"
          />
          <meta name="description" content="Всё, что нужно для вашего Образования" />

          <meta name="application-name" content="xi.effect" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="xi.effect" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="msapplication-config" content="/browserconfig.xml" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="format-detection" content="address=no" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Roboto:ital@1&display=swap"
            rel="stylesheet"
          />
          <link rel="apple-touch-icon" sizes="180x180" href="/assets/apple-touch-icon.png" />
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

          <link rel="manifest" href="/manifest.json" />
          <link rel="mask-icon" href="/assets/safari-pinned-tab.svg" color="#5d74a6" />
          <meta name="msapplication-TileColor" content="#5d74a6" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content="#5d74a6" />
          <script
            async
            defer
            data-website-id="e9570b38-1176-44ac-854c-5b7ad4380a47"
            src="https://analytics.xieffect.ru/umami.js"
          />
          {this.props.emotionStyleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it"s compatible with server-side generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const originalRenderPage = ctx.renderPage;

  // You can consider sharing the same emotion cache between all the SSR requests to speed up performance.
  // However, be aware that it can have global side effects.
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />;
        },
    });

  const initialProps = await Document.getInitialProps(ctx);
  // This is important. It prevents Emotion to render invalid HTML.
  // See https://github.com/mui/material-ui/issues/26561#issuecomment-855286153
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    emotionStyleTags,
  };
};
