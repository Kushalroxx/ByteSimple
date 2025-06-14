export interface userinterface {
    id: string,
    email: string,
    type: "admin" | "subAdmin"|"user",
}

export interface contactinterface {
    name: string,
    email: string,
    phone: string,
    description: string
}


export interface bloginterface {
    id: string,
    blogName: string,
    description: string[],
    links?: string[],
    slug: string
}

export interface aboutinterface {
    id: string,
    image: string,
    description: string
}

export interface serviceDemoInterface {
    id: string,
    video: string,
    demoName: string,
    description: string,
    link?: string
}

export interface serviceInterface {
    id: string,
    serviceName: string,
    description: string,
    image: string
}