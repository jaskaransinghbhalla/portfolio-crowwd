import NavBar from "@/components/NavBar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <div className="bg-violet-100 font-sans">
    <NavBar />
    <Component {...pageProps} />
  </div>
}
