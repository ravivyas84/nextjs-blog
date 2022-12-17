import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import html from 'remark-html'
import { parseISO, format } from 'date-fns'
import { json } from 'stream/consumers'
const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)
    const date = parseISO(matterResult.data.date)
    
    const permaLink = format(date, 'yyyy') + "/" +  format(date, 'LL') + "/" + format(date, 'dd') + "/" + matterResult.data.slug
    
    // console.log("Page Data: "+ JSON.stringify(matterResult.data));

    // Combine the data with the id
    return {
      id,
      permaLink,
      ...(matterResult.data as { date: string; title: string ; tags: string[]})
    }
  })
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}


export function getAllPostPermas() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    const date = parseISO(matterResult.data.date)


    // Combine the data with the id
    return {
      params: {
        slug:[
        format(date, 'yyyy') ,  format(date, 'LL') , format(date, 'dd') , matterResult.data.slug]
      }
    }
  })

  // console.log("Data : " + JSON.stringify(allPostsData));
  
  return allPostsData

}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}

export async function getPostData(slug: [string]) {
  // console.log("Post data requested : " + JSON.stringify(slug))
  const id = slug[slug.length-1];
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  
  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)
  const date = parseISO(matterResult.data.date)
  const permaLink = format(date, 'yyyy') + "/" +  format(date, 'LL') + "/" + format(date, 'dd') + "/" + matterResult.data.slug


  // Use remark to convert markdown into HTML string
  // const processedContent = await remark()
  //   .use(html)
  //   .process(matterResult.content)
  
  
  const processedContent = await unified()
  .use(remarkParse)
  .use(remarkRehype, {allowDangerousHtml: true})
  .use(rehypeRaw)
  .use(rehypeSanitize)
  .use(rehypeStringify)
  .process(matterResult.content)
  
  const contentHtml = processedContent.toString()

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,permaLink,
    ...(matterResult.data as { date: string; title: string; description: string; })
  }
}

