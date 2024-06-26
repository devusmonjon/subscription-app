import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import AuthContextProvider from "@/context/auth.context";

export default function App({ Component, pageProps }: AppProps) {
  // @ts-ignore
  return <AuthContextProvider>
    <Component {...pageProps} />
  </AuthContextProvider>
}
