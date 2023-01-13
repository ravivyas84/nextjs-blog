import Head from 'next/head'
import Image from 'next/image'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import Header from './headers/Header'
import Footer from './footers/Footer'

const name = 'Ravi Vyas'
export const siteTitle = 'Ravi Vyas Blog'
let env = process.env.NODE_ENV;

export default function Layout({
  children,
  home
}: {
  children: React.ReactNode
  home?: boolean
}) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        {/* <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        /> */}
        {/* <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        /> */}
        {/* <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" /> */}
        { env === 'development' ? "": <script async defer data-website-id="b2485249-6ade-4ba4-93f8-d9b89f3129f6" src="https://umami.ravivyas.com/umami.js"></script>}
        <link
          rel="preload"
          href="https://unpkg.com/prismjs@0.0.1/themes/prism-tomorrow.css"
          as="script"
        />
      </Head>
      <Header />
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    <Footer />
    </div>
  )
}