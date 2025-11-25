import React from 'react';
import { QueryClientProvider } from 'react-query';
import { Layout } from '../components';
import { queryClient } from '../lib/queryClient';
import 'tailwindcss/tailwind.css';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  );
}

export default MyApp;
