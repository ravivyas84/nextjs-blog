import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import { GetStaticProps } from "next";
import utilStyles from "../../styles/utils.module.css";
import Link from "next/link";
import Date from "../../components/date";
import Header from "../../components/headers/Header";
import { getAllTagsData } from "../../lib/tags";
import { json } from "stream/consumers";
import Footer from "../../components/footers/Footer";

export default function Home({
  allTags,
}: {
  allTags: {
    key: string;
    value: number;
  }[];
}) {
  // console.log("Props:" + JSON.stringify(allTags))
  return (
    <div className={styles.container}>
      <Head>
        <title>Tags | Ravi Vyas</title>
        <meta name="description" content="List of Tags Ravi Vyas has written about" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
          <h2 className={utilStyles.headingLg}>Tags</h2>
          <ul className={utilStyles.list}>
          {allTags.map(({ key, value }) => (
              <li className={utilStyles.tagListItem} key={key}>
                <Link href={`/tag/${key}`}>
                <a>
                <span>{key}</span> (<span>{value}</span>)
                <br />
                </a>
                </Link>
              </li>
            ))}
          </ul>

          
        </section>
      </main>

    <Footer />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  // Pull 10 posts
  const allTags =  getAllTagsData();
  // console.log("Sorted posts:: " + JSON.stringify(allTags));

  return {
    props: {
      allTags
    }
  };
};
