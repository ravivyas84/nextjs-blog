import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { all } from 'remark-rehype'
const postsDirectory = path.join(process.cwd(), 'posts')

export function getAllTagsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  var tags:string[] = [];
  const allTags = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    // const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)
    // const date = parseISO(matterResult.data.date)
    
    // const permaLink = format(date, 'yyyy') + "/" +  format(date, 'LL') + "/" + format(date, 'dd') + "/" + matterResult.data.slug
    
    // console.log("Tags: "+ JSON.stringify(matterResult.data.tags));
    // Combine the data with the id
    tags.push(matterResult.data.tags);
    return {
      ...(matterResult.data.tags)
    }
  })
  
  // console.log("Tags: "+ tags.toString());
  // const flatTags = tags.flat(1);
  // console.log("Tags: "+ JSON.stringify(flatTags));


  interface PropObject {
    [index: string]: number;
  }
  
  const groupByCounter = (key : number) => (result : PropObject ,current : string ) => {
  
    result[current[key]] = result[current[key]] ? result[current[key]] + 1 : 1;
    return result;
  };
  
  const group = tags.reduce(groupByCounter(0),{});
  
  var tagArray: {
    key: string;
    value: number;
  }[] = []

  Object.keys(group).map((innerAttr, index) => {
    // console.log(" Key: " + innerAttr + " Value:" + group[innerAttr] );
    tagArray.push({"key":innerAttr,"value":group[innerAttr]})
    })

    // console.log(JSON.stringify(tagArray));


  
  return tagArray;
}

// export interface TAG {
//   key: string;
//   count: number;
// }[]