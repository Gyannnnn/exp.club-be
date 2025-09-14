import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import cors from 'cors';
import authRouter from "./Routes/Auth/auth.routes.js";
import userRouter from "./Routes/User/user.routes.js";
const app = express();
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to exp.club task backend"
    });
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.listen(process.env.PORT || 4000, () => {
    console.log(`Server is running at http://localhost:${process.env.PORT || 4000}`);
});
//# sourceMappingURL=index.js.map