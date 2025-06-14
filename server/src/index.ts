import app from "./app";
import dotenv from "dotenv";
import connectToDb from "./lib/connectToDb";

dotenv.config();

connectToDb(process.env.MONGO_URL);

app.listen(process.env.PORT||3000, () => {
    console.log(`Server running on port ${process.env.PORT||3000}`);  
})
