"use client"
import { Card, CardContent, CardHeader, CardTitle } from "../ui";
import Link from "next/link";
export default function BlogCard({
  title,
  description,
  image,
  slug
}:{
  title:string,
  image:string,
  description:string,
  slug:string
}) {
  return (
      <Card className="w-[87vw] sm:w-xl bg-transparent shadow-foreground/5 hover:shadow-lg transition-shadow duration-300 rounded-2xl shadow-md md:w-[39rem]  hover:bg-zinc-400/5 ">
        <Link href={`/blogs/${slug}`}>
        <CardHeader className=" flex flex-row gap-5 md:gap-7 justify-center items-center">
          <img className="rounded-2xl w-[7rem] sm:w-[10rem] md:w-[17rem] " src={image} alt="blogImage" />
          <div>
          <CardTitle className=" break-words whitespace-normal text-lg md:text-2xl font-extrabold text-shadow">{title}</CardTitle>
          <p className="text-foreground/80 md:text-base text-sm pt-2 break-words whitespace-normal">{description}</p>
          </div>
        </CardHeader>
        </Link>
      </Card>
  );
}
