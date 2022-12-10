import { getSortedPostsData } from "../lib/posts";
import { GetStaticProps } from "next";
import { getPageData } from '../lib/pages'
import { parseISO,parse, format } from 'date-fns'

export default function SiteMap({
  allPostsData
}: {
  allPostsData: {
    date: string;
    title: string;
    id: string;
    permaLink: string;
  }[];
}) {
  const EXTERNAL_DATA_URL = 'https://ravivyas.com';
  
  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <!--We manually set the two URLs we know already-->
    <url>
      <loc>https://ravivyas.com</loc>
    </url>
    <url>
      <loc>https://ravivyas.com/video</loc>
    </url>
    <url>
      <loc>https://ravivyas.com/puremetrics</loc>
    </url>
    <url>
      <loc>https://ravivyas.com/odiocast</loc>
    </url>
    ${allPostsData.map(({ date,permaLink }) => {
        return `
      <url>
          <loc>${`${EXTERNAL_DATA_URL}/${permaLink}`}</loc>
          <lastmod>${format(parseISO(date), 'yyyy-MM-d')}T00:00:00.000Z</lastmod>
      </url>
    `;
      })
      .join('')}
  </urlset>
`;
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    },
  };
};
