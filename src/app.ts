import express, { Application } from "express";
import { MealRouter } from "./modules/menu.route";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from 'cors';

const app: Application = express();

app.use(cors({
    origin: process.env.APP_URL || "http://localhost:4000", 
    credentials: true
}))

app.use(express.json());
app.all('/api/auth/*splat', toNodeHandler(auth));

app.use("/posts", MealRouter);
app.get("/", (req, res) => {
    res.send("Hello, World!");
});
export default app;