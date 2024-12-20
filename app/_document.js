import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Add meta tags, styles, fonts, or other custom <head> elements here */}
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta charSet="UTF-8" />
          <meta name="description" content="My Next.js App" />
          <link rel="icon" href="/favicon.ico" />
        <title>twtwtgwtg</title>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
