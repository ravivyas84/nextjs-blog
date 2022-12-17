import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { getSortedPostsData } from "../lib/posts";
import { GetStaticProps } from "next";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import Date from "../components/date";
import Header from "../components/headers/Header";
import { getPageData } from '../lib/pages'
import Footer from "../components/footers/Footer";

export default function Home({
  allPostsData,pageData
}: {
  allPostsData: {
    date: string;
    title: string;
    id: string;
    permaLink: string;
    tags: string[];
  }[], pageData: {
    title: string
    date: string
    contentHtml: string
  };
}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Ravi Vyas - Home</title>
        <meta name="description" content="Ravi Vyas's home on the internet. Product Manager, Entreprenure, Operator. This is where he pens his thoughs." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
          <h2 className={utilStyles.headingLg}>Latest Blog posts</h2>
          <ul className={utilStyles.list}>
            {allPostsData.map(({ id, date, title, permaLink,tags }) => (
              <li className={utilStyles.listItem} key={id}>
                <small className={utilStyles.lightText}>
                  <Date dateString={date} />
                </small>
                <Link href={`${permaLink}`}>
                  <a>{title}</a>
                </Link>
                <br />
              </li>
            ))}
          </ul>
        
          <div className={"content"} dangerouslySetInnerHTML={{ __html: pageData.contentHtml }} />
          
          </section>
      </main>

      <Footer />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  // Pull 10 posts
  const allPostsData = getSortedPostsData().slice(0, 9);
  // console.log("Home Sorted posts:: " + JSON.stringify(allPostsData));
  const pageData = await getPageData("index");
  return {
    props: {
      allPostsData,
      pageData
    }
  };
};
