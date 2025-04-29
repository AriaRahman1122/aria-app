import AppShell from '@/components/layouts/AppShell';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '@/store/exampleStore';

interface CustomAppProps extends AppProps {
  Component: any;
  pageProps: any;
}

export default function App({ Component, pageProps }: CustomAppProps) {
  return (
    <Provider store={store}>
      <AppShell>
        <Component {...pageProps} />
      </AppShell>
    </Provider>
  );
}