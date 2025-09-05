import BlogCard from "@/components/majorUi/blogCard";
import { serverUrl } from "@/lib/exportEnv";
import { blogInterface } from "@/lib/interfaces";
import InViewAnimation from "../majorUi/inViewAnimation";
import PaginationForBlog from "../majorUi/paginationForBlog";

export default async function Blogs({page}:{page:number}) {
  try {
    const res = await fetch(`${serverUrl}/blogs?page=${page||1}`,{next:{},cache:"no-store"})
    console.log(res);
    
    const data = await res.json()
    const blogs = data.blogs as blogInterface[]
    const noOfBlogs = data.noOfBlogs as number
    const noOfPages = Math.ceil(noOfBlogs/10)
    console.log(noOfPages);
    
    let shownText = blogs[0].description[0].content.filter((e:any)=>e.type === "paragraph")
    shownText = shownText[0].content.map((e:any)=>e.text) 
    let descText=""
    for (let index = 0; index < shownText.length; index++) {
      descText += shownText[index]
    }
    return (
      <>
      <div className="flex flex-col items-center justify-center gap-4 py-4 pt-32 ">
      {
        blogs.map(e=>
          <InViewAnimation key={e._id}>
          <BlogCard image={e.links[0]} slug={e.slug} description={descText.length>100?descText.slice(0,45)+" ...":descText} title={e.blogName.length>30?e.blogName.slice(0,50)+" ...":e.blogName} key={e._id} />
          </InViewAnimation>

)
}
      </div>
       <PaginationForBlog page={page} noOfPages={noOfPages}/>
       </>
      )
  } catch (error) {
    throw new Error("server error");
    
    
  }
}
