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

const allowedOrigins = [
    "https://secure-pay-rust.vercel.app",
    "https://secure-pay-sachin-prajapatis-projects.vercel.app"
];

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            // Allow the request if the origin is in the allowedOrigins array or if there is no origin
            callback(null, true);
        } else {
            // Otherwise, reject the request
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

app.use("/api/v1/user", userRoute);
app.use('/api/v1/account',accountRoute);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is listening at ${PORT}`);
});
