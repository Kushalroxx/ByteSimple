"use client"
import Title from "./title"
import Description from "./description"
import InViewAnimation from "./inViewAnimation"
import { Button } from "../ui"
import { useRouter } from "nextjs-toploader/app"

function HomeText(){
  const router = useRouter()
    return(
       <div id="title" 
               className="flex flex-col justify-center items-center md:items-start px-[3%] h-full w-full md:w-[80%] mt-3">
                <InViewAnimation delay={0.25}>
                  <>
                 <Title className="">Byte Simple</Title>
                 </>
                 </InViewAnimation>
                 <InViewAnimation className="w-2/3 md:3/4" delay={0.4}>
                 <Description className=" text-center md:text-left">We design fast, responsive, and user-friendly websites tailored to your business goals.</Description>
                 </InViewAnimation>
                 <InViewAnimation className="flex gap-3 pt-2" delay={0.55}>
                  <>
                <Button onClick={()=>router.push("/contactus")} className=" mt-3 md:text-base text-sm font-bold ">Get a Quote</Button>
                <Button variant={"outline"} onClick={()=>router.push("/services")} className="hidden md:flex justify-center items-center mt-3 md:text-base text-sm font-bold">View Services</Button>
                </>
                 </InViewAnimation>
               </div>
    )
}
export default HomeText