import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import router from "./routes/spotCardsRouter.js";

dotenv.config();

const app = express();

app.set('trust proxy', true);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/cyberspots", router);

try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database connected");
} catch (e) {
    console.log("Database connection failed");
}



app.listen(process.env.EXPRESS_PORT, () => {
    console.log(`Server is listening on port ${process.env.EXPRESS_PORT}`);
});

