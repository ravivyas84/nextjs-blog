import { useRouter } from 'next/router'
import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import { GetStaticProps, GetStaticPaths } from 'next'
import utilStyles from "../../styles/utils.module.css";
import Link from "next/link";
import Date from "../../components/date";
import Header from "../../components/headers/Header";
import { getAllTagsPages,getAllTagPermas } from "../../lib/tags";
import { json } from "stream/consumers";

export default function Home({
  allTagPages,params
}: {
  allTagPages: {
    date: string;
    title: string;
    tag: string;
    permaLink: string;
    tags: string[];
  }[],
  params:{
    [key: string]: any; 
  };
}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Tag - {params.id}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
          <h2 className={utilStyles.headingLg}>Tagged {params.id}</h2>
          <ul className={utilStyles.list}>
          {allTagPages.map(({ permaLink,title,date,tag }) => (
               <li className={utilStyles.listItem} key={tag}>
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

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllTagPermas()
  // const paths = getAllPostIds()
  console.log("Paths: " + JSON.stringify(paths))
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // Pull 10 posts
  
  const tag = params?.id!
  console.log("Tag Param:: " + tag);
  const allTagPages =  getAllTagsPages(tag as string);
  console.log("Tag Pages:: " + JSON.stringify(allTagPages ));
  return {
    props: {
      allTagPages,
      params
    }
  };
};
