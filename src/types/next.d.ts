import type { Store } from '@/store/exampleStore';

declare module 'next/app' {
  interface AppProps {
    initialReduxState?: Store;
  }
}