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
      <Card className="w-[87%] md:w-1/2 hover:bg-zinc-800 ">
        <Link href={`/blogs/${slug}`}>
        <CardHeader className=" flex md:gap-6 justify-center items-center">
          <div>
          <CardTitle className=" break-words whitespace-normal text-xl md:text-3xl font-extrabold text-shadow">{title}</CardTitle>
          <p className="text-foreground/55 mt-2 md:mt-6 break-words whitespace-normal">{description}</p>
          </div>
          <img className="rounded-xl mb-5 w-[45%] md:w-[38%]" src={image} alt="blogImage" />
        </CardHeader>
        </Link>
      </Card>
  );
}
