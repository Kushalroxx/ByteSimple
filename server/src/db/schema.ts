import mongoose, { mongo } from "mongoose"

const serviceSchema = new mongoose.Schema({
    serviceName: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    image: { type: String, required: true }
}, {
    timestamps: true
});

const serviceDemoSchema = new mongoose.Schema({
    video: { type: String, required: true },
    demoName: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    link: { type: String }
}, {
    timestamps: true
});

const aboutSchema = new mongoose.Schema({
    image: { type: String, required: true },
    description: { type: String, required: true }
}, {
    timestamps: true
});
const blogCategorySchema = new mongoose.Schema({
    category: { type: String, required: true }
}, {
    timestamps: true
})
const blogSchema = new mongoose.Schema({
    slug: { type: String, required: true, unique: true },
    links: { type: [String], default: [] },
    blogName: { type: String, required: true },
    description: { type: [mongoose.Schema.Types.Mixed], required: true },
    tags: { type: [String], default: [] },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "BlogCategory", required: true },
    subCategory: { type: mongoose.Schema.Types.ObjectId, ref: "BlogCategory", required: true }
}, {
    timestamps: true
});

const customerContactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    description: { type: String, required: true }
}, {
    timestamps: true
});
const userSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String },
    type: {
        type: String, required: true, enum: {
            values: ["subAdmin", "user"],
            message: "{VALUE} is not supported"
        }
    },
    name: { type: String, required: true },
}, {
    timestamps: true
})

const projectRequestSchema = new mongoose.Schema({
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    projectTitle: { type: String, required: true },
    projectDescription: { type: String, required: true },
    designPreference: { type: String },
    projectType: { type: String, required: true },
    projectLink: { type: String },
    budget: {
        min: { type: Number, required: true },
        max: { type: Number, required: true }
    },
    initialQuote: { type: Number },
    clientQuote: { type: Number },
    finalQuote: { type: Number },
    status: {
        type: String, required: true, enum: {
            values: ['pending',
                'reviewed',
                'quoted',
                'client-countered',
                'final-countered',
                'approved',
                'in-progress',
                'completed',
                'cancelled'],
            message: "{VALUE} is not supported"
        },
        default: "pending"
    },
    urgency: {
        type: String,
        enum: {
            values: ["urgent", "normal", "not-urgent"],
            message: "{VALUE} is not supported"
        },
        default: "normal"
    },
    techPreference: { type: [String]},
    paymentType: {
        type: String,
        enum: {
            values: ["fixed", "hourly"],
            message: "{VALUE} is not supported"
        },
        default: "fixed"
    },
    payment: {
        upfront: {
            type: Boolean,
            default: false
        },
        final: {
            type: Boolean,
            default: false
        }
    },
    delivery: {
        codeLink: { type: String },
        notes: { type: String }
    },
    projectedTime: { type: Number },
    message: [{
        from: {
            type: String, enum: {
                values: ["client", "admin"],
                message: "{VALUE} is not supported"
            },
            default: "client"
        },
        message: { type: String },
        timestamp: { type: Date, default: Date.now }
    }]
},{
    timestamps: true})

const Service = mongoose.model("Service", serviceSchema)
const ServiceDemo = mongoose.model("ServiceDemo", serviceDemoSchema)
const About = mongoose.model("About", aboutSchema)
const Blog = mongoose.model("Blog", blogSchema)
const CustomerContact = mongoose.model("CustomerContact", customerContactSchema)
const User = mongoose.model("User", userSchema)
const ProjectRequest = mongoose.model("ProjectRequest", projectRequestSchema)
const BlogCategory = mongoose.model("BlogCategory", blogCategorySchema)
export { Service, ServiceDemo, About, Blog, CustomerContact, User, ProjectRequest, BlogCategory }