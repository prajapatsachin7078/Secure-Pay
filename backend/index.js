import express, { json } from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import accountRoute from "./routes/account.route.js";

const app = express();

config();

app.use(json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true
};
app.use(cors(corsOptions));

const PORT = process.env.PORT || 3001;

app.use("/api/v1/user", userRoute);
app.use('/api/v1/account',accountRoute);

app.listen(3001, () => {
    connectDB();
    console.log(`Server is listening at ${PORT}`);
});
