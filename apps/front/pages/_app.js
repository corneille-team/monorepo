import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import { appWithTranslation } from 'next-i18next';
import { ToastContainer } from 'react-toastify';

import theme from '../src/styles/theme';
import { wrapper } from '../src/store';
import { GlobalStyle } from '../src/styles/global';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

class MyApp extends App {
  componentDidMount() {
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = process.env.crispWebsiteId;
    window.$crisp.push(['safe', true]);
    (() => {
      const d = document;
      const s = d.createElement('script');
      s.src = 'https://client.crisp.chat/l.js';
      s.async = true;
      d.getElementsByTagName('head')[0].appendChild(s);
    })();
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head title="Dreamtone">
          <title>Dreamtone</title>
          <link rel="icon" href="/logo.svg" />

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
            rel="stylesheet"
          />
        </Head>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Component {...pageProps} />
          <ToastContainer />
        </ThemeProvider>
      </>
    );
  }
}

export default appWithTranslation(wrapper.withRedux(MyApp));
