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

export interface projectInterface {
  _id: string;
  clientId: string;
  projectTitle: string;
  projectDescription: string;
  designPreference?: string;
  projectType: string;
  projectLink?: string;
  budget: {
    min: number;
    max: number;
  };
  initialQuote?: number;
  clientQuote?: number;
  finalQuote?: number;
  status:
    | "pending"
    | "reviewed"
    | "quoted"
    | "client-countered"
    | "final-countered"
    | "approved"
    | "in-progress"
    | "completed"
    | "cancelled";
  urgency?: "urgent" | "normal" | "not-urgent";
  techPreference?: string[];
  paymentType?: "fixed" | "hourly";
  payment: {
    upfront: boolean;
    final: boolean;
  };
  delivery?: {
    codeLink?: string;
    notes?: string;
  };
  projectedTime?: number;
  message: {
    from: "client" | "admin";
    message: string;
    timestamp: Date;
  }[];
  createdAt?: Date;
  updatedAt?: Date;
}
