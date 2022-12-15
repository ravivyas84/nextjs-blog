import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { getSortedPostsData } from "../lib/posts";
import { GetStaticProps } from "next";
import utilStyles from "../styles/utils.module.css";
import Header from "../components/headers/Header";
import { getPageData } from '../lib/pages'

export default function Home({
  pageData
}: {
   pageData: {
    title: string
    date: string
    contentHtml: string
  };
}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Puremetrics</title>
        <meta name="description" content="PureMetrics.io | Startup shutdown" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        
        
          <div className={"content"} dangerouslySetInnerHTML={{ __html: pageData.contentHtml }} />
          
          </section>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const pageData = await getPageData("puremetrics");
  return {
    props: {
      pageData
    },
  };
};
