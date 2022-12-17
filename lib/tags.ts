import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { all } from 'remark-rehype'
import { parseISO, format } from 'date-fns'
const postsDirectory = path.join(process.cwd(), 'posts')

export function getAllTagsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  var tags:string[] = [];
  const allTags = fileNames.map(fileName => {

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)
    
    // Combine the data with the id
    tags.push(matterResult.data.tags);
    return {
      ...(matterResult.data.tags)
    }
  })
  
  interface PropObject {
    [index: string]: number;
  }
  
  const groupByCounter = (key : number) => (result : PropObject ,current : string ) => {
    const splitString = current.toString().split(",");
    splitString.forEach((tag) => {
      // console.log("Split Tag:" + tag);
      // console.log("Key : " + key + " ::: " + "current: " + current.toString() + ":::" + current.length);
      result[tag] = result[tag] ? result[tag] + 1 : 1;
    })
    return result;
  };
  
  const group = tags.reduce(groupByCounter(0),{});
  
  // console.log("Tag Count: "+ JSON.stringify(group));

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

export function getAllTagsPages(tag:string) {
  // console.log("Pages requested for: " + tag);
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  var tags:{
    date: string;
    title: string;
    tag: string;
    permaLink: string;
    tags: string[];
  }[] = [];
  const allTags = fileNames.map(fileName => {
    
    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)
    const date = parseISO(matterResult.data.date)
    
    const permaLink = format(date, 'yyyy') + "/" +  format(date, 'LL') + "/" + format(date, 'dd') + "/" + matterResult.data.slug

    const searchTag = JSON.stringify(matterResult.data.tags).toLowerCase();
    // console.log("Tag from file: "+ searchTag)
    if(searchTag.indexOf(tag.toLowerCase(),0)>0){
      tags.push({
        tag,
        permaLink,
        ...(matterResult.data as { date: string; title: string ,tags:string[]})
    });
      // console.log("Tags: "+ permaLink)
    } else {
      // console.log("Tags no match " + searchTag);
    }
    
      return {
        tag,
        permaLink,
        ...(matterResult.data as { date: string; title: string })
    }
  })
  // console.log("Links : " + JSON.stringify(tags));
  return tags;
}

export function getAllTagPermas() {
  
  var tagArray = getAllTagsData();

  const tagPermas = tagArray.map((key,value) => {

    // Combine the data with the tag
    return {
      params: {
        "id":key.key.toString()
      }
    }
  })  

  // console.log("Tag Paths : " + JSON.stringify(tagPermas));
  
  return tagPermas;

}
