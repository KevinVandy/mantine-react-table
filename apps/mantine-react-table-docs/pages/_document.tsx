import Document, { Head, Html, Main, NextScript } from 'next/document';
import { ColorSchemeScript } from '@mantine/core';

export default class _Document extends Document {
  render() {
    return (
      <Html>
        <Head>
          <ColorSchemeScript defaultColorScheme="auto" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <div className="mantine-tooltips" />
        </body>
      </Html>
    );
  }
}
