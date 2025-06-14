export interface blogInterface {
    blogName: string,
    CreatedAt: Date
    description:any,
    links:string[],
    slug:string,
    updatedAt:Date,
    _id:string
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
export interface aboutInterFace {
    _id:string,
    image:string,
    description:string,
    createdAt:Date,
    updatedAt:Date
}
export interface serviceInterface {
    _id:string,
    serviceName:string,
    image:string,
    description:string,
    createdAt:Date,
    updatedAt:Date
}
export interface serviceDemosInterface {
    video:string,
    demoName:string,
    link?:string,
    description:string,
    _id:string,
    updatedAt:Date,
    createdAt:Date
}
export interface dashboardInterface {
        message: string,
        data:[
            {noOfContact: number},
            {noOfBlogs: number},
            {noOfServices: number},
            {noOfServicesDemo: number}
        ]
      }
export interface userFrontendSourceInterface {
  name?: string,
  email: string,
  type:"user"|"subAdmin"|"admin",
}