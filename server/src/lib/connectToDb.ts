import mongoose from "mongoose";

const connectToDb = async (url:string|undefined) => {
        await mongoose.connect(url||"")
        .then(() =>
            console.log("Connected to DB")).catch((error) => console.log(error))
        .catch((error) =>
            console.log(error));
}
export default connectToDb