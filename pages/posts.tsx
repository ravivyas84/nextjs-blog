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

export default function Home({
  allPostsData,
}: {
  allPostsData: {
    date: string;
    title: string;
    id: string;
    permaLink: string;
  }[];
}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Blog posts | Ravi Vyas</title>
        <meta name="description" content="Blog Posts by Ravi Vyas on Product Mangement, Data Analaytics, Entreprenurship & Startups" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
          <h2 className={utilStyles.headingLg}>Blog</h2>
          <ul className={utilStyles.list}>
            {allPostsData.map(({ id, date, title, permaLink }) => (
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
  
  const allPostsData = getSortedPostsData()
  // console.log("Sorted posts:: " + JSON.stringify(allPostsData));
  return {
    props: {
      allPostsData,
    },
  };
};
