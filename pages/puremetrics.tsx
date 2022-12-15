import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { getSortedPostsData } from "../lib/posts";
import { GetStaticProps } from "next";
import utilStyles from "../styles/utils.module.css";
import Header from "../components/headers/Header";
import { getPageData } from '../lib/pages'
import Footer from "../components/footers/Footer";

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

    <Footer />
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
