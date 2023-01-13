import Layout from '../components/layout'
import { getAllPostPermas, getAllPostIds, getPostData } from '../lib/posts'
import Head from 'next/head'
import Date from '../components/date'
import utilStyles from '../styles/utils.module.css'
import { GetStaticProps, GetStaticPaths } from 'next'
import Link from 'next/link'

export default function Post({
  postData
}: {
  postData: {
    title: string
    date: string
    contentHtml: string
    description: string
    permaLink: string
    twitter: string
    hnlink: string
  }
}) {
  return (
    <Layout>
      <Head>
        <title>{postData.title} | Blog post - Ravi Vyas</title>
        //if else condition to check if description is empty
        {postData.description ? <meta name="description" content={postData.description} /> : ""}
        {postData.description ? <meta name="og:description" content={postData.description} /> : ""}
          
        
        <meta name="og:title" content={postData.title} />
        <link rel="canonical" href={`https://ravivyas.com/${postData.permaLink}`}></link>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div className={"content"} dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
      {postData.twitter ? <Link href={postData.twitter}><a>Twitter Discussions</a></Link>: ""}
      <br />
      {postData.hnlink ? <Link href={postData.hnlink}><a>Hacker News</a></Link> : ""}
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostPermas()
  // const paths = getAllPostIds()
  // console.log("Paths: " + JSON.stringify(paths))
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // console.log("Page Requested : " + JSON.stringify(params?.slug))
  const postData = await getPostData(params?.slug as [string])
  return {
    props: {
      postData
    }
  }
}