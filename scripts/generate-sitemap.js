const fs = require('fs')
const globby = require('globby')
const path = require('path')
const matter = require('gray-matter')
const { parseISO, format } = require('date-fns')

const postsDirectory = path.join(process.cwd(), 'posts')

function addPage(page) {
  const path = page.replace('pages', '').replace('.js', '').replace('.md', '').replace('.tsx', '').replace('/index', '')
  console.log("Sitemap path : " + path)
  const route = path === '/index' ? '' : path

  return `  <url>
    <loc>${`https://ravivyas.com/${route}`}</loc>
    <changefreq>hourly</changefreq>
  </url>`
}

function getAllPostPermas() {
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
    return "" + format(date, 'yyyy')+"/"+format(date, 'LL')+"/"+format(date, 'dd')+"/"+matterResult.data.slug
  })

  // console.log("Data : " + JSON.stringify(allPostsData));
  
  return allPostsData

}


async function generateSitemap() {
  // Ignore Next.js specific files (e.g., _app.js) and API routes.
  var pages = await globby([
    'pages/**/*{.tsx,.md}',
    'posts/**/*{.md}',
    '!pages/_*.tsx',
    '!pages/[*.tsx',
    '!pages/tag/[*.tsx',
    '!pages/api',
  ])
  const postPermas = getAllPostPermas();
  pages = pages.concat(postPermas)
  // console.log("Pages dir: " + JSON.stringify(pages));
  // console.log("Posts dir: " + JSON.stringify(postPermas));
  const sitemap = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(addPage).join('\n')}
</urlset>`

  fs.writeFileSync('public/sitemap.xml', sitemap)
}

generateSitemap()