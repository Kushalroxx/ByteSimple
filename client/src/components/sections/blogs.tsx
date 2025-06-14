import BlogCard from "@/components/majorUi/blogCard";
import { serverUrl } from "@/lib/exportEnv";
import { blogInterface } from "@/lib/interfaces";
import axios from "axios";

export default async function Blogs({page}:{page:number}) {
  try {
    const res = await fetch(`${serverUrl}/blogs?page=${page}`,{next:{revalidate:604800}})
    const data = await res.json()
    const blogs = data.blogs as blogInterface[]
    const noOfBlogs = data.noOfBlogs
    let shownText = blogs[0].description[0].content.filter((e:any)=>e.type === "paragraph")
    shownText = shownText[0].content.map((e:any)=>e.text) 
    let descText=""
    for (let index = 0; index < shownText.length; index++) {
      descText += shownText[index]
    }
    return (
      <div className="flex flex-wrap justify-center gap-4 md:py-4 max-h-screen overflow-y-auto">
      {
        blogs.map(e=>
          <BlogCard image={e.links[0]} slug={e.slug} description={descText.length>100?descText.slice(0,100)+" ...":descText} title={e.blogName} key={e._id} />

        )
      }
      </div>)
  } catch (error) {
    return (
      <div className="flex flex-wrap justify-center gap-4 md:py-4 max-h-screen overflow-y-auto">
        something went wrong
      </div>

    )
  }
}
