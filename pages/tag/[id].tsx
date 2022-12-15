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
import Footer from "../../components/footers/Footer";

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
        <meta name="description" content={`Posts tagged ${params.id}`} />
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
               <Link href={`/${permaLink}`}>
                 <a>{title}</a>
               </Link>
               <br />
             </li>
            ))}
          </ul>

          
        </section>
      </main>

    <Footer />
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
