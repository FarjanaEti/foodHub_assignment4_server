import express, { Application } from "express";
import { MealRouter } from "./modules/menu/menu.route";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from 'cors';
import { providerRouter } from "./modules/provider/provider.route";
import { categoryRouter } from "./modules/category/category.route";

const app: Application = express();

app.use(cors({
    origin: process.env.APP_URL || "http://localhost:4000", 
    credentials: true
}))

app.use(express.json());
app.use('/api/auth', toNodeHandler(auth));

app.use("/meals", MealRouter);
app.use("/api", categoryRouter);
app.use("/provider", providerRouter);
app.get("/", (req, res) => {
    res.send("Hello, World!");
});
export default app;