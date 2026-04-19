import express, { Application } from "express";
import { MealRouter } from "./modules/menu/menu.route";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import cors from 'cors';
import { providerRouter } from "./modules/provider/provider.route";
import { categoryRouter } from "./modules/category/category.route";
import { orderRouter } from "./modules/order/order.route";
import { userRouter } from "./modules/allUser/user.route";
import { cartRouter } from "./modules/cart/cart.route";
import { reviewRouter } from "./modules/review/review.route";
import paymentRouter from "./modules/payment/payment.route";


const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [
  process.env.APP_URL || "http://localhost:3000",
  process.env.PROD_APP_URL,
].filter(Boolean);


const openCors = cors({ origin: "*" });
app.post("/payment/success", openCors, (req, res, next) => next());
app.post("/payment/fail", openCors, (req, res, next) => next());
app.post("/payment/cancel", openCors, (req, res, next) => next());

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      const isAllowed =
        allowedOrigins.includes(origin) ||
        /^https:\/\/next-blog-client.*\.vercel\.app$/.test(origin) ||
        /^https:\/\/.*\.vercel\.app$/.test(origin) ||
        /^https:\/\/.*\.sslcommerz\.com$/.test(origin); 

      if (isAllowed) {
        callback(null, true);
      } else {
         console.log("Blocked origin:", origin);
        callback(null, false);
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["Set-Cookie"],
  }),
);


app.set("trust proxy", 1);

app.use('/api/auth', toNodeHandler(auth));


app.use("/provider/meals", MealRouter);
app.use("/category", categoryRouter);
app.use("/provider", providerRouter);
app.use("/order", orderRouter);
app.use("/admin", userRouter);
app.use("/customer", cartRouter);
app.use("/customer", reviewRouter);
app.use("/payment", paymentRouter);

app.get("/", (req, res) => {
    res.send("Hello, World!");
});
export default app;