import { JSONContent } from "@tiptap/react"

export interface dashboardInterface {
        message: string,
        data:[
            {noOfContact: number},
            {noOfBlogs: number},
            {noOfServices: number},
            {noOfServicesDemo: number}
        ]
      }

export interface aboutInterface {
  image: string,
  _id: string,
  description: string
  createdAt: string,
  updatedAt: string 
}
export interface serviceIntqerface { 
  _id: string,
  serviceName: string,
  description: string,
  image: string,
  createdAt: string,
  updatedAt: string
}
export interface contactInterface {
  _id: string,
  name: string,
  email: string,
  phone: string,
  description: string,
  createdAt: string,
  updatedAt: string
}
export interface serviceDemoInterface {
  _id: string,
  demoName: string,
  description: string,
  video: string,
  createdAt: string,
  updatedAt: string
}
export interface allBlogsInterface {
  _id: string,
  slug: string,
  blogName: string,
  links: string[],
  description: JSONContent,
  createdAt: string,
  updatedAt: string
}