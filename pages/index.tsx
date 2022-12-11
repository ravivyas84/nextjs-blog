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
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
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
  // Pull 10 posts
  const allPostsData = getSortedPostsData().slice(0, 9);
  console.log("Home Sorted posts:: " + JSON.stringify(allPostsData));
  const pageData = await getPageData("index");
  return {
    props: {
      allPostsData,
      pageData
    }
  };
};
