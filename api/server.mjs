// src/app.ts
import express9 from "express";

// src/modules/menu/menu.route.ts
import express from "express";

// src/lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

// generated/prisma/client.ts
import * as path from "path";
import { fileURLToPath } from "url";

// generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.4.1",
  "engineVersion": "55ae170b1ced7fc6ed07a15f110549408c501bb3",
  "activeProvider": "postgresql",
  "inlineSchema": 'generator client {\n  provider = "prisma-client"\n  output   = "../generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nmodel User {\n  id              String           @id @default(uuid())\n  name            String\n  email           String           @unique\n  role            UserRole         @default(CUSTOMER)\n  status          UserStatus       @default(ACTIVE)\n  phone           String?\n  createdAt       DateTime         @default(now())\n  updatedAt       DateTime         @updatedAt\n  emailVerified   Boolean          @default(true)\n  image           String?\n  accounts        Account[]\n  orders          Order[]\n  providerProfile ProviderProfile?\n  reviews         Review[]\n  sessions        Session[]\n  carts           Cart[]\n\n  @@map("users")\n}\n\nmodel ProviderProfile {\n  id             String   @id @default(uuid())\n  userId         String   @unique\n  restaurantName String\n  address        String\n  phone          String\n  description    String?\n  createdAt      DateTime @default(now())\n  updatedAt      DateTime @updatedAt\n  meals          Meal[]\n  orders         Order[]\n  user           User     @relation(fields: [userId], references: [id])\n\n  @@map("provider_profiles")\n}\n\nmodel Category {\n  id        String   @id @default(uuid())\n  name      String   @unique\n  isActive  Boolean  @default(true)\n  createdAt DateTime @default(now())\n  meals     Meal[]\n\n  @@map("categories")\n}\n\nmodel Meal {\n  id          String  @id @default(uuid())\n  title       String\n  description String?\n  price       Float\n  image       String?\n  available   Boolean @default(true)\n\n  cuisine  String?\n  dietType String?\n\n  providerId String\n  categoryId String\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  category Category        @relation(fields: [categoryId], references: [id])\n  provider ProviderProfile @relation(fields: [providerId], references: [id])\n\n  orderItems OrderItem[]\n  reviews    Review[]\n  cartItems  CartItem[]\n\n  @@map("meals")\n}\n\nmodel Cart {\n  id         String   @id @default(uuid())\n  userId     String\n  providerId String\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n\n  items CartItem[]\n\n  customer User @relation(fields: [userId], references: [id])\n}\n\nmodel CartItem {\n  id       String   @id @default(uuid())\n  cartId   String\n  mealId   String\n  quantity Int\n  subtotal Decimal? @db.Decimal(10, 2)\n  cart     Cart     @relation(fields: [cartId], references: [id])\n  meal     Meal     @relation(fields: [mealId], references: [id])\n\n  @@unique([cartId, mealId])\n}\n\nmodel Order {\n  id            String        @id @default(uuid())\n  customerId    String\n  providerId    String\n  //ass-5\n  status        OrderStatus   @default(PENDING) // \u{1F525} changed\n  paymentMethod PaymentMethod\n  paymentStatus PaymentStatus @default(PENDING)\n\n  transactionId String?\n  //\n  address       String\n  totalAmount   Float\n  createdAt     DateTime        @default(now())\n  updatedAt     DateTime        @updatedAt\n  items         OrderItem[]\n  customer      User            @relation(fields: [customerId], references: [id])\n  provider      ProviderProfile @relation(fields: [providerId], references: [id])\n\n  @@map("orders")\n}\n\nmodel OrderItem {\n  id       String @id @default(uuid())\n  orderId  String\n  mealId   String\n  quantity Int\n  price    Float\n  meal     Meal   @relation(fields: [mealId], references: [id])\n  order    Order  @relation(fields: [orderId], references: [id])\n\n  @@map("order_items")\n}\n\nmodel Review {\n  id        String   @id @default(uuid())\n  rating    Int\n  comment   String?\n  userId    String\n  mealId    String\n  createdAt DateTime @default(now())\n  meal      Meal     @relation(fields: [mealId], references: [id])\n  user      User     @relation(fields: [userId], references: [id])\n\n  @@unique([userId, mealId])\n  @@map("reviews")\n}\n\nmodel Session {\n  id        String   @id\n  expiresAt DateTime\n  token     String   @unique\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  ipAddress String?\n  userAgent String?\n  userId    String\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@index([userId])\n  @@map("session")\n}\n\nmodel Account {\n  id                    String    @id\n  accountId             String\n  providerId            String\n  userId                String\n  accessToken           String?\n  refreshToken          String?\n  idToken               String?\n  accessTokenExpiresAt  DateTime?\n  refreshTokenExpiresAt DateTime?\n  scope                 String?\n  password              String?\n  createdAt             DateTime  @default(now())\n  updatedAt             DateTime  @updatedAt\n  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@index([userId])\n  @@map("account")\n}\n\nmodel Verification {\n  id         String   @id\n  identifier String\n  value      String\n  expiresAt  DateTime\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n\n  @@index([identifier])\n  @@map("verification")\n}\n\nenum UserRole {\n  CUSTOMER\n  PROVIDER\n  ADMIN\n}\n\nenum UserStatus {\n  ACTIVE\n  SUSPENDED\n}\n\nenum OrderStatus {\n  PENDING\n  PLACED\n  PREPARING\n  READY\n  DELIVERED\n  CANCELLED\n}\n\n//ass-5\nenum PaymentMethod {\n  COD\n  ONLINE\n}\n\nenum PaymentStatus {\n  PENDING\n  PAID\n  FAILED\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  },
  "parameterizationSchema": {
    "strings": [],
    "graph": ""
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"role","kind":"enum","type":"UserRole"},{"name":"status","kind":"enum","type":"UserStatus"},{"name":"phone","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"image","kind":"scalar","type":"String"},{"name":"accounts","kind":"object","type":"Account","relationName":"AccountToUser"},{"name":"orders","kind":"object","type":"Order","relationName":"OrderToUser"},{"name":"providerProfile","kind":"object","type":"ProviderProfile","relationName":"ProviderProfileToUser"},{"name":"reviews","kind":"object","type":"Review","relationName":"ReviewToUser"},{"name":"sessions","kind":"object","type":"Session","relationName":"SessionToUser"},{"name":"carts","kind":"object","type":"Cart","relationName":"CartToUser"}],"dbName":"users"},"ProviderProfile":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"restaurantName","kind":"scalar","type":"String"},{"name":"address","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"meals","kind":"object","type":"Meal","relationName":"MealToProviderProfile"},{"name":"orders","kind":"object","type":"Order","relationName":"OrderToProviderProfile"},{"name":"user","kind":"object","type":"User","relationName":"ProviderProfileToUser"}],"dbName":"provider_profiles"},"Category":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"meals","kind":"object","type":"Meal","relationName":"CategoryToMeal"}],"dbName":"categories"},"Meal":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"Float"},{"name":"image","kind":"scalar","type":"String"},{"name":"available","kind":"scalar","type":"Boolean"},{"name":"cuisine","kind":"scalar","type":"String"},{"name":"dietType","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"categoryId","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"category","kind":"object","type":"Category","relationName":"CategoryToMeal"},{"name":"provider","kind":"object","type":"ProviderProfile","relationName":"MealToProviderProfile"},{"name":"orderItems","kind":"object","type":"OrderItem","relationName":"MealToOrderItem"},{"name":"reviews","kind":"object","type":"Review","relationName":"MealToReview"},{"name":"cartItems","kind":"object","type":"CartItem","relationName":"CartItemToMeal"}],"dbName":"meals"},"Cart":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"items","kind":"object","type":"CartItem","relationName":"CartToCartItem"},{"name":"customer","kind":"object","type":"User","relationName":"CartToUser"}],"dbName":null},"CartItem":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"cartId","kind":"scalar","type":"String"},{"name":"mealId","kind":"scalar","type":"String"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"subtotal","kind":"scalar","type":"Decimal"},{"name":"cart","kind":"object","type":"Cart","relationName":"CartToCartItem"},{"name":"meal","kind":"object","type":"Meal","relationName":"CartItemToMeal"}],"dbName":null},"Order":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"customerId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"OrderStatus"},{"name":"paymentMethod","kind":"enum","type":"PaymentMethod"},{"name":"paymentStatus","kind":"enum","type":"PaymentStatus"},{"name":"transactionId","kind":"scalar","type":"String"},{"name":"address","kind":"scalar","type":"String"},{"name":"totalAmount","kind":"scalar","type":"Float"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"items","kind":"object","type":"OrderItem","relationName":"OrderToOrderItem"},{"name":"customer","kind":"object","type":"User","relationName":"OrderToUser"},{"name":"provider","kind":"object","type":"ProviderProfile","relationName":"OrderToProviderProfile"}],"dbName":"orders"},"OrderItem":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"orderId","kind":"scalar","type":"String"},{"name":"mealId","kind":"scalar","type":"String"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"price","kind":"scalar","type":"Float"},{"name":"meal","kind":"object","type":"Meal","relationName":"MealToOrderItem"},{"name":"order","kind":"object","type":"Order","relationName":"OrderToOrderItem"}],"dbName":"order_items"},"Review":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"rating","kind":"scalar","type":"Int"},{"name":"comment","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"mealId","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"meal","kind":"object","type":"Meal","relationName":"MealToReview"},{"name":"user","kind":"object","type":"User","relationName":"ReviewToUser"}],"dbName":"reviews"},"Session":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"token","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"ipAddress","kind":"scalar","type":"String"},{"name":"userAgent","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"SessionToUser"}],"dbName":"session"},"Account":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"accountId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"accessToken","kind":"scalar","type":"String"},{"name":"refreshToken","kind":"scalar","type":"String"},{"name":"idToken","kind":"scalar","type":"String"},{"name":"accessTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"refreshTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"scope","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"user","kind":"object","type":"User","relationName":"AccountToUser"}],"dbName":"account"},"Verification":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"identifier","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"verification"}},"enums":{},"types":{}}');
config.parameterizationSchema = {
  strings: JSON.parse('["where","orderBy","cursor","user","accounts","meals","_count","category","orders","provider","orderItems","meal","reviews","items","customer","cart","cartItems","order","providerProfile","sessions","carts","User.findUnique","User.findUniqueOrThrow","User.findFirst","User.findFirstOrThrow","User.findMany","data","User.createOne","User.createMany","User.createManyAndReturn","User.updateOne","User.updateMany","User.updateManyAndReturn","create","update","User.upsertOne","User.deleteOne","User.deleteMany","having","_min","_max","User.groupBy","User.aggregate","ProviderProfile.findUnique","ProviderProfile.findUniqueOrThrow","ProviderProfile.findFirst","ProviderProfile.findFirstOrThrow","ProviderProfile.findMany","ProviderProfile.createOne","ProviderProfile.createMany","ProviderProfile.createManyAndReturn","ProviderProfile.updateOne","ProviderProfile.updateMany","ProviderProfile.updateManyAndReturn","ProviderProfile.upsertOne","ProviderProfile.deleteOne","ProviderProfile.deleteMany","ProviderProfile.groupBy","ProviderProfile.aggregate","Category.findUnique","Category.findUniqueOrThrow","Category.findFirst","Category.findFirstOrThrow","Category.findMany","Category.createOne","Category.createMany","Category.createManyAndReturn","Category.updateOne","Category.updateMany","Category.updateManyAndReturn","Category.upsertOne","Category.deleteOne","Category.deleteMany","Category.groupBy","Category.aggregate","Meal.findUnique","Meal.findUniqueOrThrow","Meal.findFirst","Meal.findFirstOrThrow","Meal.findMany","Meal.createOne","Meal.createMany","Meal.createManyAndReturn","Meal.updateOne","Meal.updateMany","Meal.updateManyAndReturn","Meal.upsertOne","Meal.deleteOne","Meal.deleteMany","_avg","_sum","Meal.groupBy","Meal.aggregate","Cart.findUnique","Cart.findUniqueOrThrow","Cart.findFirst","Cart.findFirstOrThrow","Cart.findMany","Cart.createOne","Cart.createMany","Cart.createManyAndReturn","Cart.updateOne","Cart.updateMany","Cart.updateManyAndReturn","Cart.upsertOne","Cart.deleteOne","Cart.deleteMany","Cart.groupBy","Cart.aggregate","CartItem.findUnique","CartItem.findUniqueOrThrow","CartItem.findFirst","CartItem.findFirstOrThrow","CartItem.findMany","CartItem.createOne","CartItem.createMany","CartItem.createManyAndReturn","CartItem.updateOne","CartItem.updateMany","CartItem.updateManyAndReturn","CartItem.upsertOne","CartItem.deleteOne","CartItem.deleteMany","CartItem.groupBy","CartItem.aggregate","Order.findUnique","Order.findUniqueOrThrow","Order.findFirst","Order.findFirstOrThrow","Order.findMany","Order.createOne","Order.createMany","Order.createManyAndReturn","Order.updateOne","Order.updateMany","Order.updateManyAndReturn","Order.upsertOne","Order.deleteOne","Order.deleteMany","Order.groupBy","Order.aggregate","OrderItem.findUnique","OrderItem.findUniqueOrThrow","OrderItem.findFirst","OrderItem.findFirstOrThrow","OrderItem.findMany","OrderItem.createOne","OrderItem.createMany","OrderItem.createManyAndReturn","OrderItem.updateOne","OrderItem.updateMany","OrderItem.updateManyAndReturn","OrderItem.upsertOne","OrderItem.deleteOne","OrderItem.deleteMany","OrderItem.groupBy","OrderItem.aggregate","Review.findUnique","Review.findUniqueOrThrow","Review.findFirst","Review.findFirstOrThrow","Review.findMany","Review.createOne","Review.createMany","Review.createManyAndReturn","Review.updateOne","Review.updateMany","Review.updateManyAndReturn","Review.upsertOne","Review.deleteOne","Review.deleteMany","Review.groupBy","Review.aggregate","Session.findUnique","Session.findUniqueOrThrow","Session.findFirst","Session.findFirstOrThrow","Session.findMany","Session.createOne","Session.createMany","Session.createManyAndReturn","Session.updateOne","Session.updateMany","Session.updateManyAndReturn","Session.upsertOne","Session.deleteOne","Session.deleteMany","Session.groupBy","Session.aggregate","Account.findUnique","Account.findUniqueOrThrow","Account.findFirst","Account.findFirstOrThrow","Account.findMany","Account.createOne","Account.createMany","Account.createManyAndReturn","Account.updateOne","Account.updateMany","Account.updateManyAndReturn","Account.upsertOne","Account.deleteOne","Account.deleteMany","Account.groupBy","Account.aggregate","Verification.findUnique","Verification.findUniqueOrThrow","Verification.findFirst","Verification.findFirstOrThrow","Verification.findMany","Verification.createOne","Verification.createMany","Verification.createManyAndReturn","Verification.updateOne","Verification.updateMany","Verification.updateManyAndReturn","Verification.upsertOne","Verification.deleteOne","Verification.deleteMany","Verification.groupBy","Verification.aggregate","AND","OR","NOT","id","identifier","value","expiresAt","createdAt","updatedAt","equals","in","notIn","lt","lte","gt","gte","not","contains","startsWith","endsWith","accountId","providerId","userId","accessToken","refreshToken","idToken","accessTokenExpiresAt","refreshTokenExpiresAt","scope","password","token","ipAddress","userAgent","rating","comment","mealId","orderId","quantity","price","customerId","OrderStatus","status","PaymentMethod","paymentMethod","PaymentStatus","paymentStatus","transactionId","address","totalAmount","cartId","subtotal","title","description","image","available","cuisine","dietType","categoryId","name","isActive","every","some","none","restaurantName","phone","email","UserRole","role","UserStatus","emailVerified","cartId_mealId","userId_mealId","is","isNot","connectOrCreate","upsert","createMany","set","disconnect","delete","connect","updateMany","deleteMany","increment","decrement","multiply","divide"]'),
  graph: "jAZxwAETBAAAiQMAIAgAAP0CACAMAACLAwAgEgAAigMAIBMAAIwDACAUAACNAwAg3QEAAIYDADDeAQAAOAAQ3wEAAIYDADDgAQEAAAAB5AFAANICACHlAUAA0gIAIYYCAACIA6ICIpICAQD8AgAhlwIBANECACGdAgEA_AIAIZ4CAQAAAAGgAgAAhwOgAiKiAiAA-AIAIQEAAAABACARAwAA_gIAIN0BAACkAwAw3gEAAAMAEN8BAACkAwAw4AEBANECACHkAUAA0gIAIeUBQADSAgAh8QEBANECACHyAQEA0QIAIfMBAQDRAgAh9AEBAPwCACH1AQEA_AIAIfYBAQD8AgAh9wFAAKUDACH4AUAApQMAIfkBAQD8AgAh-gEBAPwCACEIAwAA4gQAIPQBAACrAwAg9QEAAKsDACD2AQAAqwMAIPcBAACrAwAg-AEAAKsDACD5AQAAqwMAIPoBAACrAwAgEQMAAP4CACDdAQAApAMAMN4BAAADABDfAQAApAMAMOABAQAAAAHkAUAA0gIAIeUBQADSAgAh8QEBANECACHyAQEA0QIAIfMBAQDRAgAh9AEBAPwCACH1AQEA_AIAIfYBAQD8AgAh9wFAAKUDACH4AUAApQMAIfkBAQD8AgAh-gEBAPwCACEDAAAAAwAgAQAABAAwAgAABQAgEQkAAJwDACANAACdAwAgDgAA_gIAIN0BAACgAwAw3gEAAAcAEN8BAACgAwAw4AEBANECACHkAUAA0gIAIeUBQADSAgAh8gEBANECACGEAgEA0QIAIYYCAAChA4YCIogCAACiA4gCIooCAACjA4oCIosCAQD8AgAhjAIBANECACGNAggAmgMAIQQJAACwBQAgDQAAuAUAIA4AAOIEACCLAgAAqwMAIBEJAACcAwAgDQAAnQMAIA4AAP4CACDdAQAAoAMAMN4BAAAHABDfAQAAoAMAMOABAQAAAAHkAUAA0gIAIeUBQADSAgAh8gEBANECACGEAgEA0QIAIYYCAAChA4YCIogCAACiA4gCIooCAACjA4oCIosCAQD8AgAhjAIBANECACGNAggAmgMAIQMAAAAHACABAAAIADACAAAJACAKCwAAlgMAIBEAAJ8DACDdAQAAngMAMN4BAAALABDfAQAAngMAMOABAQDRAgAhgAIBANECACGBAgEA0QIAIYICAgCTAwAhgwIIAJoDACECCwAAtgUAIBEAALkFACAKCwAAlgMAIBEAAJ8DACDdAQAAngMAMN4BAAALABDfAQAAngMAMOABAQAAAAGAAgEA0QIAIYECAQDRAgAhggICAJMDACGDAggAmgMAIQMAAAALACABAAAMADACAAANACAUBwAAmwMAIAkAAJwDACAKAACdAwAgDAAAiwMAIBAAAI8DACDdAQAAmQMAMN4BAAAPABDfAQAAmQMAMOABAQDRAgAh5AFAANICACHlAUAA0gIAIfIBAQDRAgAhgwIIAJoDACGQAgEA0QIAIZECAQD8AgAhkgIBAPwCACGTAiAA-AIAIZQCAQD8AgAhlQIBAPwCACGWAgEA0QIAIQkHAAC3BQAgCQAAsAUAIAoAALgFACAMAACxBQAgEAAAtAUAIJECAACrAwAgkgIAAKsDACCUAgAAqwMAIJUCAACrAwAgFAcAAJsDACAJAACcAwAgCgAAnQMAIAwAAIsDACAQAACPAwAg3QEAAJkDADDeAQAADwAQ3wEAAJkDADDgAQEAAAAB5AFAANICACHlAUAA0gIAIfIBAQDRAgAhgwIIAJoDACGQAgEA0QIAIZECAQD8AgAhkgIBAPwCACGTAiAA-AIAIZQCAQD8AgAhlQIBAPwCACGWAgEA0QIAIQMAAAAPACABAAAQADACAAARACABAAAADwAgAwAAAA8AIAEAABAAMAIAABEAIAMAAAAHACABAAAIADACAAAJACABAAAADwAgAQAAAAcAIAMAAAALACABAAAMADACAAANACALAwAA_gIAIAsAAJYDACDdAQAAmAMAMN4BAAAZABDfAQAAmAMAMOABAQDRAgAh5AFAANICACHzAQEA0QIAIf4BAgCTAwAh_wEBAPwCACGAAgEA0QIAIQMDAADiBAAgCwAAtgUAIP8BAACrAwAgDAMAAP4CACALAACWAwAg3QEAAJgDADDeAQAAGQAQ3wEAAJgDADDgAQEAAAAB5AFAANICACHzAQEA0QIAIf4BAgCTAwAh_wEBAPwCACGAAgEA0QIAIaQCAACXAwAgAwAAABkAIAEAABoAMAIAABsAIAoLAACWAwAgDwAAlQMAIN0BAACSAwAw3gEAAB0AEN8BAACSAwAw4AEBANECACGAAgEA0QIAIYICAgCTAwAhjgIBANECACGPAhAAlAMAIQMLAAC2BQAgDwAAtQUAII8CAACrAwAgCwsAAJYDACAPAACVAwAg3QEAAJIDADDeAQAAHQAQ3wEAAJIDADDgAQEAAAABgAIBANECACGCAgIAkwMAIY4CAQDRAgAhjwIQAJQDACGjAgAAkQMAIAMAAAAdACABAAAeADACAAAfACADAAAAHQAgAQAAHgAwAgAAHwAgAQAAAB0AIAEAAAALACABAAAAGQAgAQAAAB0AIAEAAAALACAOAwAA_gIAIAUAAPkCACAIAAD9AgAg3QEAAPsCADDeAQAAJwAQ3wEAAPsCADDgAQEA0QIAIeQBQADSAgAh5QFAANICACHzAQEA0QIAIYwCAQDRAgAhkQIBAPwCACGcAgEA0QIAIZ0CAQDRAgAhAQAAACcAIAMAAAAZACABAAAaADACAAAbACAMAwAA_gIAIN0BAACQAwAw3gEAACoAEN8BAACQAwAw4AEBANECACHjAUAA0gIAIeQBQADSAgAh5QFAANICACHzAQEA0QIAIfsBAQDRAgAh_AEBAPwCACH9AQEA_AIAIQMDAADiBAAg_AEAAKsDACD9AQAAqwMAIAwDAAD-AgAg3QEAAJADADDeAQAAKgAQ3wEAAJADADDgAQEAAAAB4wFAANICACHkAUAA0gIAIeUBQADSAgAh8wEBANECACH7AQEAAAAB_AEBAPwCACH9AQEA_AIAIQMAAAAqACABAAArADACAAAsACAKDQAAjwMAIA4AAP4CACDdAQAAjgMAMN4BAAAuABDfAQAAjgMAMOABAQDRAgAh5AFAANICACHlAUAA0gIAIfIBAQDRAgAh8wEBANECACECDQAAtAUAIA4AAOIEACAKDQAAjwMAIA4AAP4CACDdAQAAjgMAMN4BAAAuABDfAQAAjgMAMOABAQAAAAHkAUAA0gIAIeUBQADSAgAh8gEBANECACHzAQEA0QIAIQMAAAAuACABAAAvADACAAAwACABAAAAAwAgAQAAAAcAIAEAAAAZACABAAAAKgAgAQAAAC4AIAEAAAABACATBAAAiQMAIAgAAP0CACAMAACLAwAgEgAAigMAIBMAAIwDACAUAACNAwAg3QEAAIYDADDeAQAAOAAQ3wEAAIYDADDgAQEA0QIAIeQBQADSAgAh5QFAANICACGGAgAAiAOiAiKSAgEA_AIAIZcCAQDRAgAhnQIBAPwCACGeAgEA0QIAIaACAACHA6ACIqICIAD4AgAhCAQAAK8FACAIAADhBAAgDAAAsQUAIBIAALAFACATAACyBQAgFAAAswUAIJICAACrAwAgnQIAAKsDACADAAAAOAAgAQAAOQAwAgAAAQAgAwAAADgAIAEAADkAMAIAAAEAIAMAAAA4ACABAAA5ADACAAABACAQBAAAqQUAIAgAAKoFACAMAACsBQAgEgAAqwUAIBMAAK0FACAUAACuBQAg4AEBAAAAAeQBQAAAAAHlAUAAAAABhgIAAACiAgKSAgEAAAABlwIBAAAAAZ0CAQAAAAGeAgEAAAABoAIAAACgAgKiAiAAAAABARoAAD0AIArgAQEAAAAB5AFAAAAAAeUBQAAAAAGGAgAAAKICApICAQAAAAGXAgEAAAABnQIBAAAAAZ4CAQAAAAGgAgAAAKACAqICIAAAAAEBGgAAPwAwARoAAD8AMBAEAADoBAAgCAAA6QQAIAwAAOsEACASAADqBAAgEwAA7AQAIBQAAO0EACDgAQEAqQMAIeQBQACqAwAh5QFAAKoDACGGAgAA5wSiAiKSAgEArwMAIZcCAQCpAwAhnQIBAK8DACGeAgEAqQMAIaACAADmBKACIqICIACIBAAhAgAAAAEAIBoAAEIAIArgAQEAqQMAIeQBQACqAwAh5QFAAKoDACGGAgAA5wSiAiKSAgEArwMAIZcCAQCpAwAhnQIBAK8DACGeAgEAqQMAIaACAADmBKACIqICIACIBAAhAgAAADgAIBoAAEQAIAIAAAA4ACAaAABEACADAAAAAQAgIQAAPQAgIgAAQgAgAQAAAAEAIAEAAAA4ACAFBgAA4wQAICcAAOUEACAoAADkBAAgkgIAAKsDACCdAgAAqwMAIA3dAQAA_wIAMN4BAABLABDfAQAA_wIAMOABAQDJAgAh5AFAAMoCACHlAUAAygIAIYYCAACBA6ICIpICAQDUAgAhlwIBAMkCACGdAgEA1AIAIZ4CAQDJAgAhoAIAAIADoAIiogIgAPMCACEDAAAAOAAgAQAASgAwJgAASwAgAwAAADgAIAEAADkAMAIAAAEAIA4DAAD-AgAgBQAA-QIAIAgAAP0CACDdAQAA-wIAMN4BAAAnABDfAQAA-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-AQIAAAAB_wEBAAAAAYACAQAAAAEBGgAA8gEAIAbgAQEAAAAB5AFAAAAAAfMBAQAAAAH-AQIAAAAB_wEBAAAAAYACAQAAAAEBGgAA9AEAMAEaAAD0AQAwCAMAAL8DACALAAC-AwAg4AEBAKkDACHkAUAAqgMAIfMBAQCpAwAh_gECAL0DACH_AQEArwMAIYACAQCpAwAhAgAAABsAIBoAAPcBACAG4AEBAKkDACHkAUAAqgMAIfMBAQCpAwAh_gECAL0DACH_AQEArwMAIYACAQCpAwAhAgAAABkAIBoAAPkBACACAAAAGQAgGgAA-QEAIAMAAAAbACAhAADyAQAgIgAA9wEAIAEAAAAbACABAAAAGQAgBgYAALgDACAnAAC7AwAgKAAAugMAIFkAALkDACBaAAC8AwAg_wEAAKsDACAJ3QEAANwCADDeAQAAgAIAEN8BAADcAgAw4AEBAMkCACHkAUAAygIAIfMBAQDJAgAh_gECAN0CACH_AQEA1AIAIYACAQDJAgAhAwAAABkAIAEAAP8BADAmAACAAgAgAwAAABkAIAEAABoAMAIAABsAIAEAAAAsACABAAAALAAgAwAAACoAIAEAACsAMAIAACwAIAMAAAAqACABAAArADACAAAsACADAAAAKgAgAQAAKwAwAgAALAAgCQMAALcDACDgAQEAAAAB4wFAAAAAAeQBQAAAAAHlAUAAAAAB8wEBAAAAAfsBAQAAAAH8AQEAAAAB_QEBAAAAAQEaAACIAgAgCOABAQAAAAHjAUAAAAAB5AFAAAAAAeUBQAAAAAHzAQEAAAAB-wEBAAAAAfwBAQAAAAH9AQEAAAABARoAAIoCADABGgAAigIAMAkDAAC2AwAg4AEBAKkDACHjAUAAqgMAIeQBQACqAwAh5QFAAKoDACHzAQEAqQMAIfsBAQCpAwAh_AEBAK8DACH9AQEArwMAIQIAAAAsACAaAACNAgAgCOABAQCpAwAh4wFAAKoDACHkAUAAqgMAIeUBQACqAwAh8wEBAKkDACH7AQEAqQMAIfwBAQCvAwAh_QEBAK8DACECAAAAKgAgGgAAjwIAIAIAAAAqACAaAACPAgAgAwAAACwAICEAAIgCACAiAACNAgAgAQAAACwAIAEAAAAqACAFBgAAswMAICcAALUDACAoAAC0AwAg_AEAAKsDACD9AQAAqwMAIAvdAQAA2wIAMN4BAACWAgAQ3wEAANsCADDgAQEAyQIAIeMBQADKAgAh5AFAAMoCACHlAUAAygIAIfMBAQDJAgAh-wEBAMkCACH8AQEA1AIAIf0BAQDUAgAhAwAAACoAIAEAAJUCADAmAACWAgAgAwAAACoAIAEAACsAMAIAACwAIAEAAAAFACABAAAABQAgAwAAAAMAIAEAAAQAMAIAAAUAIAMAAAADACABAAAEADACAAAFACADAAAAAwAgAQAABAAwAgAABQAgDgMAALIDACDgAQEAAAAB5AFAAAAAAeUBQAAAAAHxAQEAAAAB8gEBAAAAAfMBAQAAAAH0AQEAAAAB9QEBAAAAAfYBAQAAAAH3AUAAAAAB-AFAAAAAAfkBAQAAAAH6AQEAAAABARoAAJ4CACAN4AEBAAAAAeQBQAAAAAHlAUAAAAAB8QEBAAAAAfIBAQAAAAHzAQEAAAAB9AEBAAAAAfUBAQAAAAH2AQEAAAAB9wFAAAAAAfgBQAAAAAH5AQEAAAAB-gEBAAAAAQEaAACgAgAwARoAAKACADAOAwAAsQMAIOABAQCpAwAh5AFAAKoDACHlAUAAqgMAIfEBAQCpAwAh8gEBAKkDACHzAQEAqQMAIfQBAQCvAwAh9QEBAK8DACH2AQEArwMAIfcBQACwAwAh-AFAALADACH5AQEArwMAIfoBAQCvAwAhAgAAAAUAIBoAAKMCACAN4AEBAKkDACHkAUAAqgMAIeUBQACqAwAh8QEBAKkDACHyAQEAqQMAIfMBAQCpAwAh9AEBAK8DACH1AQEArwMAIfYBAQCvAwAh9wFAALADACH4AUAAsAMAIfkBAQCvAwAh-gEBAK8DACECAAAAAwAgGgAApQIAIAIAAAADACAaAAClAgAgAwAAAAUAICEAAJ4CACAiAACjAgAgAQAAAAUAIAEAAAADACAKBgAArAMAICcAAK4DACAoAACtAwAg9AEAAKsDACD1AQAAqwMAIPYBAACrAwAg9wEAAKsDACD4AQAAqwMAIPkBAACrAwAg-gEAAKsDACAQ3QEAANMCADDeAQAArAIAEN8BAADTAgAw4AEBAMkCACHkAUAAygIAIeUBQADKAgAh8QEBAMkCACHyAQEAyQIAIfMBAQDJAgAh9AEBANQCACH1AQEA1AIAIfYBAQDUAgAh9wFAANUCACH4AUAA1QIAIfkBAQDUAgAh-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_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-gIAMN4BAABjABDfAQAA-gIAMOABAQDJAgAh5AFAAMoCACHlAUAAygIAIfMBAQDJAgAhjAIBAMkCACGRAgEA1AIAIZwCAQDJAgAhnQIBAMkCACEOAwAA_gIAIAUAAPkCACAIAAD9AgAg3QEAAPsCADDeAQAAJwAQ3wEAAPsCADDgAQEA0QIAIeQBQADSAgAh5QFAANICACHzAQEA0QIAIYwCAQDRAgAhkQIBAPwCACGcAgEA0QIAIZ0CAQDRAgAhC-YBAQAAAAHnAQEAAAAF6AEBAAAABekBAQAAAAHqAQEAAAAB6wEBAAAAAewBAQAAAAHtAQEA2gIAIe4BAQAAAAHvAQEAAAAB8AEBAAAAAQOZAgAABwAgmgIAAAcAIJsCAAAHACAVBAAAiQMAIAgAAP0CACAMAACLAwAgEgAAigMAIBMAAIwDACAUAACNAwAg3QEAAIYDADDeAQAAOAAQ3wEAAIYDADDgAQEA0QIAIeQBQADSAgAh5QFAANICACGGAgAAiAOiAiKSAgEA_AIAIZcCAQDRAgAhnQIBAPwCACGeAgEA0QIAIaACAACHA6ACIqICIAD4AgAhpQIAADgAIKYCAAA4ACAN3QEAAP8CADDeAQAASwAQ3wEAAP8CADDgAQEAyQIAIeQBQADKAgAh5QFAAMoCACGGAgAAgQOiAiKSAgEA1AIAIZcCAQDJAgAhnQIBANQCACGeAgEAyQIAIaACAACAA6ACIqICIADzAgAhBwYAAMwCACAnAACFAwAgKAAAhQMAIOYBAAAAoAIC5wEAAACgAgjoAQAAAKACCO0BAACEA6ACIgcGAADMAgAgJwAAgwMAICgAAIMDACDmAQAAAKICAucBAAAAogII6AEAAACiAgjtAQAAggOiAiIHBgAAzAIAICcAAIMDACAoAACDAwAg5gEAAACiAgLnAQAAAKICCOgBAAAAogII7QEAAIIDogIiBOYBAAAAogIC5wEAAACiAgjoAQAAAKICCO0BAACDA6ICIgcGAADMAgAgJwAAhQMAICgAAIUDACDmAQAAAKACAucBAAAAoAII6AEAAACgAgjtAQAAhAOgAiIE5gEAAACgAgLnAQAAAKACCOgBAAAAoAII7QEAAIUDoAIiEwQAAIkDACAIAAD9AgAgDAAAiwMAIBIAAIoDACATAACMAwAgFAAAjQMAIN0BAACGAwAw3gEAADgAEN8BAACGAwAw4AEBANECACHkAUAA0gIAIeUBQADSAgAhhgIAAIgDogIikgIBAPwCACGXAgEA0QIAIZ0CAQD8AgAhngIBANECACGgAgAAhwOgAiKiAiAA-AIAIQTmAQAAAKACAucBAAAAoAII6AEAAACgAgjtAQAAhQOgAiIE5gEAAACiAgLnAQAAAKICCOgBAAAAogII7QEAAIMDogIiA5kCAAADACCaAgAAAwAgmwIAAAMAIBADAAD-AgAgBQAA-QIAIAgAAP0CACDdAQAA-wIAMN4BAAAnABDfAQAA-wIAMOABAQDRAgAh5AFAANICACHlAUAA0gIAIfMBAQDRAgAhjAIBANECACGRAgEA_AIAIZwCAQDRAgAhnQIBANECACGlAgAAJwAgpgIAACcAIAOZAgAAGQAgmgIAABkAIJsCAAAZACADmQIAACoAIJoCAAAqACCbAgAAKgAgA5kCAAAuACCaAgAALgAgmwIAAC4AIAoNAACPAwAgDgAA_gIAIN0BAACOAwAw3gEAAC4AEN8BAACOAwAw4AEBANECACHkAUAA0gIAIeUBQADSAgAh8gEBANECACHzAQEA0QIAIQOZAgAAHQAgmgIAAB0AIJsCAAAdACAMAwAA_gIAIN0BAACQAwAw3gEAACoAEN8BAACQAwAw4AEBANECACHjAUAA0gIAIeQBQADSAgAh5QFAANICACHzAQEA0QIAIfsBAQDRAgAh_AEBAPwCACH9AQEA_AIAIQKAAgEAAAABjgIBAAAAAQoLAACWAwAgDwAAlQMAIN0BAACSAwAw3gEAAB0AEN8BAACSAwAw4AEBANECACGAAgEA0QIAIYICAgCTAwAhjgIBANECACGPAhAAlAMAIQjmAQIAAAAB5wECAAAABOgBAgAAAATpAQIAAAAB6gECAAAAAesBAgAAAAHsAQIAAAAB7QECAMwCACEI5gEQAAAAAecBEAAAAAXoARAAAAAF6QEQAAAAAeoBEAAAAAHrARAAAAAB7AEQAAAAAe0BEADwAgAhDA0AAI8DACAOAAD-AgAg3QEAAI4DADDeAQAALgAQ3wEAAI4DADDgAQEA0QIAIeQBQADSAgAh5QFAANICACHyAQEA0QIAIfMBAQDRAgAhpQIAAC4AIKYCAAAuACAWBwAAmwMAIAkAAJwDACAKAACdAwAgDAAAiwMAIBAAAI8DACDdAQAAmQMAMN4BAAAPABDfAQAAmQMAMOABAQDRAgAh5AFAANICACHlAUAA0gIAIfIBAQDRAgAhgwIIAJoDACGQAgEA0QIAIZECAQD8AgAhkgIBAPwCACGTAiAA-AIAIZQCAQD8AgAhlQIBAPwCACGWAgEA0QIAIaUCAAAPACCmAgAADwAgAvMBAQAAAAGAAgEAAAABCwMAAP4CACALAACWAwAg3QEAAJgDADDeAQAAGQAQ3wEAAJgDADDgAQEA0QIAIeQBQADSAgAh8wEBANECACH-AQIAkwMAIf8BAQD8AgAhgAIBANECACEUBwAAmwMAIAkAAJwDACAKAACdAwAgDAAAiwMAIBAAAI8DACDdAQAAmQMAMN4BAAAPABDfAQAAmQMAMOABAQDRAgAh5AFAANICACHlAUAA0gIAIfIBAQDRAgAhgwIIAJoDACGQAgEA0QIAIZECAQD8AgAhkgIBAPwCACGTAiAA-AIAIZQCAQD8AgAhlQIBAPwCACGWAgEA0QIAIQjmAQgAAAAB5wEIAAAABOgBCAAAAATpAQgAAAAB6gEIAAAAAesBCAAAAAHsAQgAAAAB7QEIAN8CACEKBQAA-QIAIN0BAAD3AgAw3gEAAGkAEN8BAAD3AgAw4AEBANECACHkAUAA0gIAIZcCAQDRAgAhmAIgAPgCACGlAgAAaQAgpgIAAGkAIBADAAD-AgAgBQAA-QIAIAgAAP0CACDdAQAA-wIAMN4BAAAnABDfAQAA-wIAMOABAQDRAgAh5AFAANICACHlAUAA0gIAIfMBAQDRAgAhjAIBANECACGRAgEA_AIAIZwCAQDRAgAhnQIBANECACGlAgAAJwAgpgIAACcAIAOZAgAACwAgmgIAAAsAIJsCAAALACAKCwAAlgMAIBEAAJ8DACDdAQAAngMAMN4BAAALABDfAQAAngMAMOABAQDRAgAhgAIBANECACGBAgEA0QIAIYICAgCTAwAhgwIIAJoDACETCQAAnAMAIA0AAJ0DACAOAAD-AgAg3QEAAKADADDeAQAABwAQ3wEAAKADADDgAQEA0QIAIeQBQADSAgAh5QFAANICACHyAQEA0QIAIYQCAQDRAgAhhgIAAKEDhgIiiAIAAKIDiAIiigIAAKMDigIiiwIBAPwCACGMAgEA0QIAIY0CCACaAwAhpQIAAAcAIKYCAAAHACARCQAAnAMAIA0AAJ0DACAOAAD-AgAg3QEAAKADADDeAQAABwAQ3wEAAKADADDgAQEA0QIAIeQBQADSAgAh5QFAANICACHyAQEA0QIAIYQCAQDRAgAhhgIAAKEDhgIiiAIAAKIDiAIiigIAAKMDigIiiwIBAPwCACGMAgEA0QIAIY0CCACaAwAhBOYBAAAAhgIC5wEAAACGAgjoAQAAAIYCCO0BAADsAoYCIgTmAQAAAIgCAucBAAAAiAII6AEAAACIAgjtAQAA6gKIAiIE5gEAAACKAgLnAQAAAIoCCOgBAAAAigII7QEAAOgCigIiEQMAAP4CACDdAQAApAMAMN4BAAADABDfAQAApAMAMOABAQDRAgAh5AFAANICACHlAUAA0gIAIfEBAQDRAgAh8gEBANECACHzAQEA0QIAIfQBAQD8AgAh9QEBAPwCACH2AQEA_AIAIfcBQAClAwAh-AFAAKUDACH5AQEA_AIAIfoBAQD8AgAhCOYBQAAAAAHnAUAAAAAF6AFAAAAABekBQAAAAAHqAUAAAAAB6wFAAAAAAewBQAAAAAHtAUAA2AIAIQAAAAGqAgEAAAABAaoCQAAAAAEAAAAAAaoCAQAAAAEBqgJAAAAAAQUhAACIBgAgIgAAiwYAIKcCAACJBgAgqAIAAIoGACCtAgAAAQAgAyEAAIgGACCnAgAAiQYAIK0CAAABACAAAAAFIQAAgwYAICIAAIYGACCnAgAAhAYAIKgCAACFBgAgrQIAAAEAIAMhAACDBgAgpwIAAIQGACCtAgAAAQAgAAAAAAAFqgICAAAAAbACAgAAAAGxAgIAAAABsgICAAAAAbMCAgAAAAEFIQAA-wUAICIAAIEGACCnAgAA_AUAIKgCAACABgAgrQIAABEAIAUhAAD5BQAgIgAA_gUAIKcCAAD6BQAgqAIAAP0FACCtAgAAAQAgAyEAAPsFACCnAgAA_AUAIK0CAAARACADIQAA-QUAIKcCAAD6BQAgrQIAAAEAIAAAAAAABaoCCAAAAAGwAggAAAABsQIIAAAAAbICCAAAAAGzAggAAAABBSEAAPEFACAiAAD3BQAgpwIAAPIFACCoAgAA9gUAIK0CAAARACAFIQAA7wUAICIAAPQFACCnAgAA8AUAIKgCAADzBQAgrQIAAAkAIAMhAADxBQAgpwIAAPIFACCtAgAAEQAgAyEAAO8FACCnAgAA8AUAIK0CAAAJACAAAAAAAAGqAgAAAIYCAgGqAgAAAIgCAgGqAgAAAIoCAgshAADXAwAwIgAA3AMAMKcCAADYAwAwqAIAANkDADCpAgAA2gMAIKoCAADbAwAwqwIAANsDADCsAgAA2wMAMK0CAADbAwAwrgIAAN0DADCvAgAA3gMAMAUhAADmBQAgIgAA7QUAIKcCAADnBQAgqAIAAOwFACCtAgAAAQAgBSEAAOQFACAiAADqBQAgpwIAAOUFACCoAgAA6QUAIK0CAABOACAFCwAAygMAIOABAQAAAAGAAgEAAAABggICAAAAAYMCCAAAAAECAAAADQAgIQAA4gMAIAMAAAANACAhAADiAwAgIgAA4QMAIAEaAADoBQAwCgsAAJYDACARAACfAwAg3QEAAJ4DADDeAQAACwAQ3wEAAJ4DADDgAQEAAAABgAIBANECACGBAgEA0QIAIYICAgCTAwAhgwIIAJoDACECAAAADQAgGgAA4QMAIAIAAADfAwAgGgAA4AMAIAjdAQAA3gMAMN4BAADfAwAQ3wEAAN4DADDgAQEA0QIAIYACAQDRAgAhgQIBANECACGCAgIAkwMAIYMCCACaAwAhCN0BAADeAwAw3gEAAN8DABDfAQAA3gMAMOABAQDRAgAhgAIBANECACGBAgEA0QIAIYICAgCTAwAhgwIIAJoDACEE4AEBAKkDACGAAgEAqQMAIYICAgC9AwAhgwIIAMcDACEFCwAAyAMAIOABAQCpAwAhgAIBAKkDACGCAgIAvQMAIYMCCADHAwAhBQsAAMoDACDgAQEAAAABgAIBAAAAAYICAgAAAAGDAggAAAABBCEAANcDADCnAgAA2AMAMKkCAADaAwAgrQIAANsDADADIQAA5gUAIKcCAADnBQAgrQIAAAEAIAMhAADkBQAgpwIAAOUFACCtAgAATgAgAAAAAAAFqgIQAAAAAbACEAAAAAGxAhAAAAABsgIQAAAAAbMCEAAAAAEFIQAA3AUAICIAAOIFACCnAgAA3QUAIKgCAADhBQAgrQIAADAAIAUhAADaBQAgIgAA3wUAIKcCAADbBQAgqAIAAN4FACCtAgAAEQAgAyEAANwFACCnAgAA3QUAIK0CAAAwACADIQAA2gUAIKcCAADbBQAgrQIAABEAIAAAAAshAAD1AwAwIgAA-gMAMKcCAAD2AwAwqAIAAPcDADCpAgAA-AMAIKoCAAD5AwAwqwIAAPkDADCsAgAA-QMAMK0CAAD5AwAwrgIAAPsDADCvAgAA_AMAMAUhAADUBQAgIgAA2AUAIKcCAADVBQAgqAIAANcFACCtAgAAAQAgBQsAAO8DACDgAQEAAAABgAIBAAAAAYICAgAAAAGPAhAAAAABAgAAAB8AICEAAIAEACADAAAAHwAgIQAAgAQAICIAAP8DACABGgAA1gUAMAsLAACWAwAgDwAAlQMAIN0BAACSAwAw3gEAAB0AEN8BAACSAwAw4AEBAAAAAYACAQDRAgAhggICAJMDACGOAgEA0QIAIY8CEACUAwAhowIAAJEDACACAAAAHwAgGgAA_wMAIAIAAAD9AwAgGgAA_gMAIAjdAQAA_AMAMN4BAAD9AwAQ3wEAAPwDADDgAQEA0QIAIYACAQDRAgAhggICAJMDACGOAgEA0QIAIY8CEACUAwAhCN0BAAD8AwAw3gEAAP0DABDfAQAA_AMAMOABAQDRAgAhgAIBANECACGCAgIAkwMAIY4CAQDRAgAhjwIQAJQDACEE4AEBAKkDACGAAgEAqQMAIYICAgC9AwAhjwIQAOsDACEFCwAA7QMAIOABAQCpAwAhgAIBAKkDACGCAgIAvQMAIY8CEADrAwAhBQsAAO8DACDgAQEAAAABgAIBAAAAAYICAgAAAAGPAhAAAAABBCEAAPUDADCnAgAA9gMAMKkCAAD4AwAgrQIAAPkDADADIQAA1AUAIKcCAADVBQAgrQIAAAEAIAAAAAAAAaoCIAAAAAEFIQAAyQUAICIAANIFACCnAgAAygUAIKgCAADRBQAgrQIAAGYAIAUhAADHBQAgIgAAzwUAIKcCAADIBQAgqAIAAM4FACCtAgAATgAgCyEAAKMEADAiAACnBAAwpwIAAKQEADCoAgAApQQAMKkCAACmBAAgqgIAANsDADCrAgAA2wMAMKwCAADbAwAwrQIAANsDADCuAgAAqAQAMK8CAADeAwAwCyEAAJcEADAiAACcBAAwpwIAAJgEADCoAgAAmQQAMKkCAACaBAAgqgIAAJsEADCrAgAAmwQAMKwCAACbBAAwrQIAAJsEADCuAgAAnQQAMK8CAACeBAAwCyEAAI4EADAiAACSBAAwpwIAAI8EADCoAgAAkAQAMKkCAACRBAAgqgIAAPkDADCrAgAA-QMAMKwCAAD5AwAwrQIAAPkDADCuAgAAkwQAMK8CAAD8AwAwBQ8AAO4DACDgAQEAAAABggICAAAAAY4CAQAAAAGPAhAAAAABAgAAAB8AICEAAJYEACADAAAAHwAgIQAAlgQAICIAAJUEACABGgAAzQUAMAIAAAAfACAaAACVBAAgAgAAAP0DACAaAACUBAAgBOABAQCpAwAhggICAL0DACGOAgEAqQMAIY8CEADrAwAhBQ8AAOwDACDgAQEAqQMAIYICAgC9AwAhjgIBAKkDACGPAhAA6wMAIQUPAADuAwAg4AEBAAAAAYICAgAAAAGOAgEAAAABjwIQAAAAAQYDAADBAwAg4AEBAAAAAeQBQAAAAAHzAQEAAAAB_gECAAAAAf8BAQAAAAECAAAAGwAgIQAAogQAIAMAAAAbACAhAACiBAAgIgAAoQQAIAEaAADMBQAwDAMAAP4CACALAACWAwAg3QEAAJgDADDeAQAAGQAQ3wEAAJgDADDgAQEAAAAB5AFAANICACHzAQEA0QIAIf4BAgCTAwAh_wEBAPwCACGAAgEA0QIAIaQCAACXAwAgAgAAABsAIBoAAKEEACACAAAAnwQAIBoAAKAEACAJ3QEAAJ4EADDeAQAAnwQAEN8BAACeBAAw4AEBANECACHkAUAA0gIAIfMBAQDRAgAh_gECAJMDACH_AQEA_AIAIYACAQDRAgAhCd0BAACeBAAw3gEAAJ8EABDfAQAAngQAMOABAQDRAgAh5AFAANICACHzAQEA0QIAIf4BAgCTAwAh_wEBAPwCACGAAgEA0QIAIQXgAQEAqQMAIeQBQACqAwAh8wEBAKkDACH-AQIAvQMAIf8BAQCvAwAhBgMAAL8DACDgAQEAqQMAIeQBQACqAwAh8wEBAKkDACH-AQIAvQMAIf8BAQCvAwAhBgMAAMEDACDgAQEAAAAB5AFAAAAAAfMBAQAAAAH-AQIAAAAB_wEBAAAAAQURAADLAwAg4AEBAAAAAYECAQAAAAGCAgIAAAABgwIIAAAAAQIAAAANACAhAACrBAAgAwAAAA0AICEAAKsEACAiAACqBAAgARoAAMsFADACAAAADQAgGgAAqgQAIAIAAADfAwAgGgAAqQQAIATgAQEAqQMAIYECAQCpAwAhggICAL0DACGDAggAxwMAIQURAADJAwAg4AEBAKkDACGBAgEAqQMAIYICAgC9AwAhgwIIAMcDACEFEQAAywMAIOABAQAAAAGBAgEAAAABggICAAAAAYMCCAAAAAEDIQAAyQUAIKcCAADKBQAgrQIAAGYAIAMhAADHBQAgpwIAAMgFACCtAgAATgAgBCEAAKMEADCnAgAApAQAMKkCAACmBAAgrQIAANsDADAEIQAAlwQAMKcCAACYBAAwqQIAAJoEACCtAgAAmwQAMAQhAACOBAAwpwIAAI8EADCpAgAAkQQAIK0CAAD5AwAwAAAACyEAALUEADAiAAC6BAAwpwIAALYEADCoAgAAtwQAMKkCAAC4BAAgqgIAALkEADCrAgAAuQQAMKwCAAC5BAAwrQIAALkEADCuAgAAuwQAMK8CAAC8BAAwDwkAAK0EACAKAACuBAAgDAAArwQAIBAAALAEACDgAQEAAAAB5AFAAAAAAeUBQAAAAAHyAQEAAAABgwIIAAAAAZACAQAAAAGRAgEAAAABkgIBAAAAAZMCIAAAAAGUAgEAAAABlQIBAAAAAQIAAAARACAhAADABAAgAwAAABEAICEAAMAEACAiAAC_BAAgARoAAMYFADAUBwAAmwMAIAkAAJwDACAKAACdAwAgDAAAiwMAIBAAAI8DACDdAQAAmQMAMN4BAAAPABDfAQAAmQMAMOABAQAAAAHkAUAA0gIAIeUBQADSAgAh8gEBANECACGDAggAmgMAIZACAQDRAgAhkQIBAPwCACGSAgEA_AIAIZMCIAD4AgAhlAIBAPwCACGVAgEA_AIAIZYCAQDRAgAhAgAAABEAIBoAAL8EACACAAAAvQQAIBoAAL4EACAP3QEAALwEADDeAQAAvQQAEN8BAAC8BAAw4AEBANECACHkAUAA0gIAIeUBQADSAgAh8gEBANECACGDAggAmgMAIZACAQDRAgAhkQIBAPwCACGSAgEA_AIAIZMCIAD4AgAhlAIBAPwCACGVAgEA_AIAIZYCAQDRAgAhD90BAAC8BAAw3gEAAL0EABDfAQAAvAQAMOABAQDRAgAh5AFAANICACHlAUAA0gIAIfIBAQDRAgAhgwIIAJoDACGQAgEA0QIAIZECAQD8AgAhkgIBAPwCACGTAiAA-AIAIZQCAQD8AgAhlQIBAPwCACGWAgEA0QIAIQvgAQEAqQMAIeQBQACqAwAh5QFAAKoDACHyAQEAqQMAIYMCCADHAwAhkAIBAKkDACGRAgEArwMAIZICAQCvAwAhkwIgAIgEACGUAgEArwMAIZUCAQCvAwAhDwkAAIoEACAKAACLBAAgDAAAjAQAIBAAAI0EACDgAQEAqQMAIeQBQACqAwAh5QFAAKoDACHyAQEAqQMAIYMCCADHAwAhkAIBAKkDACGRAgEArwMAIZICAQCvAwAhkwIgAIgEACGUAgEArwMAIZUCAQCvAwAhDwkAAK0EACAKAACuBAAgDAAArwQAIBAAALAEACDgAQEAAAAB5AFAAAAAAeUBQAAAAAHyAQEAAAABgwIIAAAAAZACAQAAAAGRAgEAAAABkgIBAAAAAZMCIAAAAAGUAgEAAAABlQIBAAAAAQQhAAC1BAAwpwIAALYEADCpAgAAuAQAIK0CAAC5BAAwAAAAAAshAADVBAAwIgAA2QQAMKcCAADWBAAwqAIAANcEADCpAgAA2AQAIKoCAAC5BAAwqwIAALkEADCsAgAAuQQAMK0CAAC5BAAwrgIAANoEADCvAgAAvAQAMAshAADJBAAwIgAAzgQAMKcCAADKBAAwqAIAAMsEADCpAgAAzAQAIKoCAADNBAAwqwIAAM0EADCsAgAAzQQAMK0CAADNBAAwrgIAAM8EADCvAgAA0AQAMAUhAAC_BQAgIgAAxAUAIKcCAADABQAgqAIAAMMFACCtAgAAAQAgDA0AAOMDACAOAADkAwAg4AEBAAAAAeQBQAAAAAHlAUAAAAABhAIBAAAAAYYCAAAAhgICiAIAAACIAgKKAgAAAIoCAosCAQAAAAGMAgEAAAABjQIIAAAAAQIAAAAJACAhAADUBAAgAwAAAAkAICEAANQEACAiAADTBAAgARoAAMIFADARCQAAnAMAIA0AAJ0DACAOAAD-AgAg3QEAAKADADDeAQAABwAQ3wEAAKADADDgAQEAAAAB5AFAANICACHlAUAA0gIAIfIBAQDRAgAhhAIBANECACGGAgAAoQOGAiKIAgAAogOIAiKKAgAAowOKAiKLAgEA_AIAIYwCAQDRAgAhjQIIAJoDACECAAAACQAgGgAA0wQAIAIAAADRBAAgGgAA0gQAIA7dAQAA0AQAMN4BAADRBAAQ3wEAANAEADDgAQEA0QIAIeQBQADSAgAh5QFAANICACHyAQEA0QIAIYQCAQDRAgAhhgIAAKEDhgIiiAIAAKIDiAIiigIAAKMDigIiiwIBAPwCACGMAgEA0QIAIY0CCACaAwAhDt0BAADQBAAw3gEAANEEABDfAQAA0AQAMOABAQDRAgAh5AFAANICACHlAUAA0gIAIfIBAQDRAgAhhAIBANECACGGAgAAoQOGAiKIAgAAogOIAiKKAgAAowOKAiKLAgEA_AIAIYwCAQDRAgAhjQIIAJoDACEK4AEBAKkDACHkAUAAqgMAIeUBQACqAwAhhAIBAKkDACGGAgAA0QOGAiKIAgAA0gOIAiKKAgAA0wOKAiKLAgEArwMAIYwCAQCpAwAhjQIIAMcDACEMDQAA1AMAIA4AANUDACDgAQEAqQMAIeQBQACqAwAh5QFAAKoDACGEAgEAqQMAIYYCAADRA4YCIogCAADSA4gCIooCAADTA4oCIosCAQCvAwAhjAIBAKkDACGNAggAxwMAIQwNAADjAwAgDgAA5AMAIOABAQAAAAHkAUAAAAAB5QFAAAAAAYQCAQAAAAGGAgAAAIYCAogCAAAAiAICigIAAACKAgKLAgEAAAABjAIBAAAAAY0CCAAAAAEPBwAArAQAIAoAAK4EACAMAACvBAAgEAAAsAQAIOABAQAAAAHkAUAAAAAB5QFAAAAAAYMCCAAAAAGQAgEAAAABkQIBAAAAAZICAQAAAAGTAiAAAAABlAIBAAAAAZUCAQAAAAGWAgEAAAABAgAAABEAICEAAN0EACADAAAAEQAgIQAA3QQAICIAANwEACABGgAAwQUAMAIAAAARACAaAADcBAAgAgAAAL0EACAaAADbBAAgC-ABAQCpAwAh5AFAAKoDACHlAUAAqgMAIYMCCADHAwAhkAIBAKkDACGRAgEArwMAIZICAQCvAwAhkwIgAIgEACGUAgEArwMAIZUCAQCvAwAhlgIBAKkDACEPBwAAiQQAIAoAAIsEACAMAACMBAAgEAAAjQQAIOABAQCpAwAh5AFAAKoDACHlAUAAqgMAIYMCCADHAwAhkAIBAKkDACGRAgEArwMAIZICAQCvAwAhkwIgAIgEACGUAgEArwMAIZUCAQCvAwAhlgIBAKkDACEPBwAArAQAIAoAAK4EACAMAACvBAAgEAAAsAQAIOABAQAAAAHkAUAAAAAB5QFAAAAAAYMCCAAAAAGQAgEAAAABkQIBAAAAAZICAQAAAAGTAiAAAAABlAIBAAAAAZUCAQAAAAGWAgEAAAABBCEAANUEADCnAgAA1gQAMKkCAADYBAAgrQIAALkEADAEIQAAyQQAMKcCAADKBAAwqQIAAMwEACCtAgAAzQQAMAMhAAC_BQAgpwIAAMAFACCtAgAAAQAgAAgEAACvBQAgCAAA4QQAIAwAALEFACASAACwBQAgEwAAsgUAIBQAALMFACCSAgAAqwMAIJ0CAACrAwAgAAAAAaoCAAAAoAICAaoCAAAAogICCyEAAJ0FADAiAACiBQAwpwIAAJ4FADCoAgAAnwUAMKkCAACgBQAgqgIAAKEFADCrAgAAoQUAMKwCAAChBQAwrQIAAKEFADCuAgAAowUAMK8CAACkBQAwCyEAAJQFADAiAACYBQAwpwIAAJUFADCoAgAAlgUAMKkCAACXBQAgqgIAAM0EADCrAgAAzQQAMKwCAADNBAAwrQIAAM0EADCuAgAAmQUAMK8CAADQBAAwByEAAI8FACAiAACSBQAgpwIAAJAFACCoAgAAkQUAIKsCAAAnACCsAgAAJwAgrQIAAE4AIAshAACGBQAwIgAAigUAMKcCAACHBQAwqAIAAIgFADCpAgAAiQUAIKoCAACbBAAwqwIAAJsEADCsAgAAmwQAMK0CAACbBAAwrgIAAIsFADCvAgAAngQAMAshAAD6BAAwIgAA_wQAMKcCAAD7BAAwqAIAAPwEADCpAgAA_QQAIKoCAAD-BAAwqwIAAP4EADCsAgAA_gQAMK0CAAD-BAAwrgIAAIAFADCvAgAAgQUAMAshAADuBAAwIgAA8wQAMKcCAADvBAAwqAIAAPAEADCpAgAA8QQAIKoCAADyBAAwqwIAAPIEADCsAgAA8gQAMK0CAADyBAAwrgIAAPQEADCvAgAA9QQAMAUNAACBBAAg4AEBAAAAAeQBQAAAAAHlAUAAAAAB8gEBAAAAAQIAAAAwACAhAAD5BAAgAwAAADAAICEAAPkEACAiAAD4BAAgARoAAL4FADAKDQAAjwMAIA4AAP4CACDdAQAAjgMAMN4BAAAuABDfAQAAjgMAMOABAQAAAAHkAUAA0gIAIeUBQADSAgAh8gEBANECACHzAQEA0QIAIQIAAAAwACAaAAD4BAAgAgAAAPYEACAaAAD3BAAgCN0BAAD1BAAw3gEAAPYEABDfAQAA9QQAMOABAQDRAgAh5AFAANICACHlAUAA0gIAIfIBAQDRAgAh8wEBANECACEI3QEAAPUEADDeAQAA9gQAEN8BAAD1BAAw4AEBANECACHkAUAA0gIAIeUBQADSAgAh8gEBANECACHzAQEA0QIAIQTgAQEAqQMAIeQBQACqAwAh5QFAAKoDACHyAQEAqQMAIQUNAADzAwAg4AEBAKkDACHkAUAAqgMAIeUBQACqAwAh8gEBAKkDACEFDQAAgQQAIOABAQAAAAHkAUAAAAAB5QFAAAAAAfIBAQAAAAEH4AEBAAAAAeMBQAAAAAHkAUAAAAAB5QFAAAAAAfsBAQAAAAH8AQEAAAAB_QEBAAAAAQIAAAAsACAhAACFBQAgAwAAACwAICEAAIUFACAiAACEBQAgARoAAL0FADAMAwAA_gIAIN0BAACQAwAw3gEAACoAEN8BAACQAwAw4AEBAAAAAeMBQADSAgAh5AFAANICACHlAUAA0gIAIfMBAQDRAgAh-wEBAAAAAfwBAQD8AgAh_QEBAPwCACECAAAALAAgGgAAhAUAIAIAAACCBQAgGgAAgwUAIAvdAQAAgQUAMN4BAACCBQAQ3wEAAIEFADDgAQEA0QIAIeMBQADSAgAh5AFAANICACHlAUAA0gIAIfMBAQDRAgAh-wEBANECACH8AQEA_AIAIf0BAQD8AgAhC90BAACBBQAw3gEAAIIFABDfAQAAgQUAMOABAQDRAgAh4wFAANICACHkAUAA0gIAIeUBQADSAgAh8wEBANECACH7AQEA0QIAIfwBAQD8AgAh_QEBAPwCACEH4AEBAKkDACHjAUAAqgMAIeQBQACqAwAh5QFAAKoDACH7AQEAqQMAIfwBAQCvAwAh_QEBAK8DACEH4AEBAKkDACHjAUAAqgMAIeQBQACqAwAh5QFAAKoDACH7AQEAqQMAIfwBAQCvAwAh_QEBAK8DACEH4AEBAAAAAeMBQAAAAAHkAUAAAAAB5QFAAAAAAfsBAQAAAAH8AQEAAAAB_QEBAAAAAQYLAADAAwAg4AEBAAAAAeQBQAAAAAH-AQIAAAAB_wEBAAAAAYACAQAAAAECAAAAGwAgIQAAjgUAIAMAAAAbACAhAACOBQAgIgAAjQUAIAEaAAC8BQAwAgAAABsAIBoAAI0FACACAAAAnwQAIBoAAIwFACAF4AEBAKkDACHkAUAAqgMAIf4BAgC9AwAh_wEBAK8DACGAAgEAqQMAIQYLAAC-AwAg4AEBAKkDACHkAUAAqgMAIf4BAgC9AwAh_wEBAK8DACGAAgEAqQMAIQYLAADAAwAg4AEBAAAAAeQBQAAAAAH-AQIAAAAB_wEBAAAAAYACAQAAAAEJBQAA3gQAIAgAAN8EACDgAQEAAAAB5AFAAAAAAeUBQAAAAAGMAgEAAAABkQIBAAAAAZwCAQAAAAGdAgEAAAABAgAAAE4AICEAAI8FACADAAAAJwAgIQAAjwUAICIAAJMFACALAAAAJwAgBQAAxgQAIAgAAMcEACAaAACTBQAg4AEBAKkDACHkAUAAqgMAIeUBQACqAwAhjAIBAKkDACGRAgEArwMAIZwCAQCpAwAhnQIBAKkDACEJBQAAxgQAIAgAAMcEACDgAQEAqQMAIeQBQACqAwAh5QFAAKoDACGMAgEAqQMAIZECAQCvAwAhnAIBAKkDACGdAgEAqQMAIQwJAADlAwAgDQAA4wMAIOABAQAAAAHkAUAAAAAB5QFAAAAAAfIBAQAAAAGGAgAAAIYCAogCAAAAiAICigIAAACKAgKLAgEAAAABjAIBAAAAAY0CCAAAAAECAAAACQAgIQAAnAUAIAMAAAAJACAhAACcBQAgIgAAmwUAIAEaAAC7BQAwAgAAAAkAIBoAAJsFACACAAAA0QQAIBoAAJoFACAK4AEBAKkDACHkAUAAqgMAIeUBQACqAwAh8gEBAKkDACGGAgAA0QOGAiKIAgAA0gOIAiKKAgAA0wOKAiKLAgEArwMAIYwCAQCpAwAhjQIIAMcDACEMCQAA1gMAIA0AANQDACDgAQEAqQMAIeQBQACqAwAh5QFAAKoDACHyAQEAqQMAIYYCAADRA4YCIogCAADSA4gCIooCAADTA4oCIosCAQCvAwAhjAIBAKkDACGNAggAxwMAIQwJAADlAwAgDQAA4wMAIOABAQAAAAHkAUAAAAAB5QFAAAAAAfIBAQAAAAGGAgAAAIYCAogCAAAAiAICigIAAACKAgKLAgEAAAABjAIBAAAAAY0CCAAAAAEM4AEBAAAAAeQBQAAAAAHlAUAAAAAB8QEBAAAAAfIBAQAAAAH0AQEAAAAB9QEBAAAAAfYBAQAAAAH3AUAAAAAB-AFAAAAAAfkBAQAAAAH6AQEAAAABAgAAAAUAICEAAKgFACADAAAABQAgIQAAqAUAICIAAKcFACABGgAAugUAMBEDAAD-AgAg3QEAAKQDADDeAQAAAwAQ3wEAAKQDADDgAQEAAAAB5AFAANICACHlAUAA0gIAIfEBAQDRAgAh8gEBANECACHzAQEA0QIAIfQBAQD8AgAh9QEBAPwCACH2AQEA_AIAIfcBQAClAwAh-AFAAKUDACH5AQEA_AIAIfoBAQD8AgAhAgAAAAUAIBoAAKcFACACAAAApQUAIBoAAKYFACAQ3QEAAKQFADDeAQAApQUAEN8BAACkBQAw4AEBANECACHkAUAA0gIAIeUBQADSAgAh8QEBANECACHyAQEA0QIAIfMBAQDRAgAh9AEBAPwCACH1AQEA_AIAIfYBAQD8AgAh9wFAAKUDACH4AUAApQMAIfkBAQD8AgAh-gEBAPwCACEQ3QEAAKQFADDeAQAApQUAEN8BAACkBQAw4AEBANECACHkAUAA0gIAIeUBQADSAgAh8QEBANECACHyAQEA0QIAIfMBAQDRAgAh9AEBAPwCACH1AQEA_AIAIfYBAQD8AgAh9wFAAKUDACH4AUAApQMAIfkBAQD8AgAh-gEBAPwCACEM4AEBAKkDACHkAUAAqgMAIeUBQACqAwAh8QEBAKkDACHyAQEAqQMAIfQBAQCvAwAh9QEBAK8DACH2AQEArwMAIfcBQACwAwAh-AFAALADACH5AQEArwMAIfoBAQCvAwAhDOABAQCpAwAh5AFAAKoDACHlAUAAqgMAIfEBAQCpAwAh8gEBAKkDACH0AQEArwMAIfUBAQCvAwAh9gEBAK8DACH3AUAAsAMAIfgBQACwAwAh-QEBAK8DACH6AQEArwMAIQzgAQEAAAAB5AFAAAAAAeUBQAAAAAHxAQEAAAAB8gEBAAAAAfQBAQAAAAH1AQEAAAAB9gEBAAAAAfcBQAAAAAH4AUAAAAAB-QEBAAAAAfoBAQAAAAEEIQAAnQUAMKcCAACeBQAwqQIAAKAFACCtAgAAoQUAMAQhAACUBQAwpwIAAJUFADCpAgAAlwUAIK0CAADNBAAwAyEAAI8FACCnAgAAkAUAIK0CAABOACAEIQAAhgUAMKcCAACHBQAwqQIAAIkFACCtAgAAmwQAMAQhAAD6BAAwpwIAAPsEADCpAgAA_QQAIK0CAAD-BAAwBCEAAO4EADCnAgAA7wQAMKkCAADxBAAgrQIAAPIEADAABAMAAOIEACAFAADCBAAgCAAA4QQAIJECAACrAwAgAAAAAAINAAC0BQAgDgAA4gQAIAkHAAC3BQAgCQAAsAUAIAoAALgFACAMAACxBQAgEAAAtAUAIJECAACrAwAgkgIAAKsDACCUAgAAqwMAIJUCAACrAwAgAQUAAMIEACAABAkAALAFACANAAC4BQAgDgAA4gQAIIsCAACrAwAgDOABAQAAAAHkAUAAAAAB5QFAAAAAAfEBAQAAAAHyAQEAAAAB9AEBAAAAAfUBAQAAAAH2AQEAAAAB9wFAAAAAAfgBQAAAAAH5AQEAAAAB-gEBAAAAAQrgAQEAAAAB5AFAAAAAAeUBQAAAAAHyAQEAAAABhgIAAACGAgKIAgAAAIgCAooCAAAAigICiwIBAAAAAYwCAQAAAAGNAggAAAABBeABAQAAAAHkAUAAAAAB_gECAAAAAf8BAQAAAAGAAgEAAAABB-ABAQAAAAHjAUAAAAAB5AFAAAAAAeUBQAAAAAH7AQEAAAAB_AEBAAAAAf0BAQAAAAEE4AEBAAAAAeQBQAAAAAHlAUAAAAAB8gEBAAAAAQ8EAACpBQAgCAAAqgUAIAwAAKwFACATAACtBQAgFAAArgUAIOABAQAAAAHkAUAAAAAB5QFAAAAAAYYCAAAAogICkgIBAAAAAZcCAQAAAAGdAgEAAAABngIBAAAAAaACAAAAoAICogIgAAAAAQIAAAABACAhAAC_BQAgC-ABAQAAAAHkAUAAAAAB5QFAAAAAAYMCCAAAAAGQAgEAAAABkQIBAAAAAZICAQAAAAGTAiAAAAABlAIBAAAAAZUCAQAAAAGWAgEAAAABCuABAQAAAAHkAUAAAAAB5QFAAAAAAYQCAQAAAAGGAgAAAIYCAogCAAAAiAICigIAAACKAgKLAgEAAAABjAIBAAAAAY0CCAAAAAEDAAAAOAAgIQAAvwUAICIAAMUFACARAAAAOAAgBAAA6AQAIAgAAOkEACAMAADrBAAgEwAA7AQAIBQAAO0EACAaAADFBQAg4AEBAKkDACHkAUAAqgMAIeUBQACqAwAhhgIAAOcEogIikgIBAK8DACGXAgEAqQMAIZ0CAQCvAwAhngIBAKkDACGgAgAA5gSgAiKiAiAAiAQAIQ8EAADoBAAgCAAA6QQAIAwAAOsEACATAADsBAAgFAAA7QQAIOABAQCpAwAh5AFAAKoDACHlAUAAqgMAIYYCAADnBKICIpICAQCvAwAhlwIBAKkDACGdAgEArwMAIZ4CAQCpAwAhoAIAAOYEoAIiogIgAIgEACEL4AEBAAAAAeQBQAAAAAHlAUAAAAAB8gEBAAAAAYMCCAAAAAGQAgEAAAABkQIBAAAAAZICAQAAAAGTAiAAAAABlAIBAAAAAZUCAQAAAAEKAwAA4AQAIAgAAN8EACDgAQEAAAAB5AFAAAAAAeUBQAAAAAHzAQEAAAABjAIBAAAAAZECAQAAAAGcAgEAAAABnQIBAAAAAQIAAABOACAhAADHBQAgBOABAQAAAAHkAUAAAAABlwIBAAAAAZgCIAAAAAECAAAAZgAgIQAAyQUAIATgAQEAAAABgQIBAAAAAYICAgAAAAGDAggAAAABBeABAQAAAAHkAUAAAAAB8wEBAAAAAf4BAgAAAAH_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_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-KAA_WQA8WgA9AAAAAAAFBgA7JwA-KAA_WQA8WgA9AgkACA4AAQIJAAgOAAEFBgBEJwBHKABIWQBFWgBGAAAAAAAFBgBEJwBHKABIWQBFWgBGAgsABREAAwILAAURAAMFBgBNJwBQKABRWQBOWgBPAAAAAAAFBgBNJwBQKABRWQBOWgBPAgMAAQsABQIDAAELAAUFBgBWJwBZKABaWQBXWgBYAAAAAAAFBgBWJwBZKABaWQBXWgBYAQMAAQEDAAEDBgBfJwBgKABhAAAAAwYAXycAYCgAYQEDAAEBAwABAwYAZicAZygAaAAAAAMGAGYnAGcoAGgAAAADBgBuJwBvKABwAAAAAwYAbicAbygAcBUCARY3ARc6ARg7ARk8ARs-ARxAEh1BEx5DAR9FEiBGFCNHASRIASVJEilMFSpNGStPCCxQCC1SCC5TCC9UCDBWCDFYEjJZGjNbCDRdEjVeGzZfCDdgCDhhEjlkHDplIDtnBjxoBj1rBj5sBj9tBkBvBkFxEkJyIUN0BkR2EkV3IkZ4Bkd5Bkh6Ekl9I0p-J0t_BUyAAQVNgQEFToIBBU-DAQVQhQEFUYcBElKIAShTigEFVIwBElWNASlWjgEFV48BBViQARJbkwEqXJQBMF2VAQxelgEMX5cBDGCYAQxhmQEMYpsBDGOdARJkngExZaABDGaiARJnowEyaKQBDGmlAQxqpgESa6kBM2yqATdtqwELbqwBC2-tAQtwrgELca8BC3KxAQtzswESdLQBOHW2AQt2uAESd7kBOXi6AQt5uwELerwBEnu_ATp8wAFAfcEBA37CAQN_wwEDgAHEAQOBAcUBA4IBxwEDgwHJARKEAcoBQYUBzAEDhgHOARKHAc8BQogB0AEDiQHRAQOKAdIBEosB1QFDjAHWAUmNAdcBBI4B2AEEjwHZAQSQAdoBBJEB2wEEkgHdAQSTAd8BEpQB4AFKlQHiAQSWAeQBEpcB5QFLmAHmAQSZAecBBJoB6AESmwHrAUycAewBUp0B7QEKngHuAQqfAe8BCqAB8AEKoQHxAQqiAfMBCqMB9QESpAH2AVOlAfgBCqYB-gESpwH7AVSoAfwBCqkB_QEKqgH-ARKrAYECVawBggJbrQGDAhCuAYQCEK8BhQIQsAGGAhCxAYcCELIBiQIQswGLAhK0AYwCXLUBjgIQtgGQAhK3AZECXbgBkgIQuQGTAhC6AZQCErsBlwJevAGYAmK9AZkCAr4BmgICvwGbAgLAAZwCAsEBnQICwgGfAgLDAaECEsQBogJjxQGkAgLGAaYCEscBpwJkyAGoAgLJAakCAsoBqgISywGtAmXMAa4Cac0BsAJqzgGxAmrPAbQCatABtQJq0QG2AmrSAbgCatMBugIS1AG7AmvVAb0CatYBvwIS1wHAAmzYAcECatkBwgJq2gHDAhLbAcYCbdwBxwJx"
};
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer } = await import("buffer");
  const wasmArray = Buffer.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// generated/prisma/internal/prismaNamespace.ts
import * as runtime2 from "@prisma/client/runtime/client";
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var defineExtension = runtime2.Extensions.defineExtension;

// generated/prisma/enums.ts
var UserStatus = {
  ACTIVE: "ACTIVE",
  SUSPENDED: "SUSPENDED"
};

// generated/prisma/client.ts
globalThis["__dirname"] = path.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/lib/prisma.ts
var connectionString = `${process.env.DATABASE_URL}`;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });

// src/modules/menu/menu.services.ts
var createMeal = async (providerId, data) => {
  const category = await prisma.category.findFirst({
    where: {
      id: data.categoryId,
      isActive: true
    }
  });
  if (!category) {
    throw new Error("Invalid or inactive category");
  }
  const providerExists = await prisma.providerProfile.findUnique({
    where: { id: providerId }
  });
  if (!providerExists) {
    throw new Error("Provider profile not found");
  }
  return prisma.meal.create({
    data: {
      title: data.title.trim(),
      description: data.description?.trim(),
      price: data.price,
      categoryId: data.categoryId,
      cuisine: data.cuisine,
      dietType: data.dietType,
      image: data.image,
      providerId,
      available: true
    }
  });
};
var getAllMeals = async (params) => {
  const {
    search,
    categoryId,
    providerId,
    cuisine,
    dietType,
    minPrice,
    maxPrice,
    available
  } = params;
  const where = {};
  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } }
    ];
  }
  if (categoryId) where.categoryId = categoryId;
  if (providerId) where.providerId = providerId;
  if (typeof available === "boolean") where.available = available;
  if (cuisine) where.cuisine = cuisine;
  if (dietType) where.dietType = dietType;
  if (minPrice !== void 0 || maxPrice !== void 0) {
    where.price = {};
    if (minPrice !== void 0) where.price.gte = minPrice;
    if (maxPrice !== void 0) where.price.lte = maxPrice;
  }
  return prisma.meal.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      category: true,
      provider: true
    }
  });
};
var getMyMeals = async (providerId, query) => {
  const {
    search,
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    sortOrder = "desc"
  } = query;
  const skip = (Number(page) - 1) * Number(limit);
  const where = {
    providerId
  };
  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } }
    ];
  }
  const meals = await prisma.meal.findMany({
    where,
    skip,
    take: Number(limit),
    orderBy: { [sortBy]: sortOrder },
    include: {
      category: { select: { id: true, name: true } },
      orderItems: {
        select: {
          id: true,
          quantity: true,
          price: true,
          order: {
            select: {
              id: true,
              status: true,
              createdAt: true
            }
          }
        }
      },
      _count: { select: { reviews: true } }
    }
  });
  const total = await prisma.meal.count({ where });
  return {
    data: meals,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit))
    }
  };
};
var getMealById = async (id) => {
  const meal = await prisma.meal.findUnique({
    where: { id },
    include: {
      category: {
        select: {
          id: true,
          name: true
        }
      },
      provider: {
        select: {
          id: true,
          restaurantName: true
        }
      },
      _count: {
        select: {
          reviews: true
        }
      }
    }
  });
  if (!meal) {
    throw new Error("Meal not found");
  }
  return meal;
};
var updateMeal = async (id, payload) => {
  const meal = await prisma.meal.findUnique({ where: { id } });
  if (!meal) {
    throw new Error("Meal not found");
  }
  return prisma.meal.update({
    where: { id },
    data: {
      title: payload.title ?? meal.title,
      price: payload.price ?? meal.price,
      available: payload.available ?? meal.available
    }
  });
};
var deleteMeal = async (mealId, id) => {
  const providerProfile = await prisma.providerProfile.findUnique({
    where: { userId: id },
    select: { id: true }
  });
  if (!providerProfile) {
    throw new Error("Provider profile not found!");
  }
  const orderCount = await prisma.orderItem.count({
    where: { mealId }
  });
  if (orderCount > 0) {
    return {
      status: 409,
      message: "This meal cannot be deleted because it already has orders."
    };
  }
  const mealData = await prisma.meal.findFirst({
    where: {
      id: mealId,
      providerId: providerProfile.id
    },
    select: {
      id: true
    }
  });
  if (!mealData) {
    throw new Error("Your provided input is invalid!");
  }
  return await prisma.meal.delete({
    where: {
      id: mealData.id
    }
  });
};
var mealService = {
  createMeal,
  getAllMeals,
  getMyMeals,
  getMealById,
  updateMeal,
  deleteMeal
};

// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import nodemailer from "nodemailer";
var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.APP_USER,
    pass: process.env.APP_PASS
  }
});
var isProduction = process.env.NODE_ENV === "production";
var auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  database: prismaAdapter(prisma, {
    provider: "postgresql"
  }),
  baseURL: process.env.BETTER_AUTH_URL,
  trustedOrigins: [
    "https://assignment4-client-lilac.vercel.app",
    "https://*.vercel.app",
    "http://localhost:3000"
  ],
  cookies: {
    sessionToken: {
      name: "better-auth.session_token",
      attributes: {
        httpOnly: true,
        // sameSite: "none",
        // secure: true,
        sameSite: isProduction ? "none" : "lax",
        secure: isProduction,
        path: "/"
      }
    }
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60
    },
    expiresIn: 60 * 60 * 24 * 7
  },
  advanced: {
    cookiePrefix: "better-auth",
    useSecureCookies: process.env.NODE_ENV === "production",
    crossSubDomainCookies: {
      enabled: false
    },
    disableCSRFCheck: true
  },
  user: {
    fields: {
      emailVerified: "emailVerified"
    },
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "CUSTOMER",
        required: false
      },
      phone: {
        type: "string",
        required: false
      }
    }
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: false
  },
  emailVerification: {
    sendOnSignUp: false
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          console.log("Creating user, forcing emailVerified to true...");
          return {
            data: {
              ...user,
              emailVerified: true
            }
          };
        }
      }
    }
  },
  socialProviders: {
    google: {
      prompt: "select_account consent",
      accessType: "offline",
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      scope: ["email", "profile", "openid"],
      skipStateCookieCheck: true,
      redirectURI: "https://assignment4-backend-red.vercel.app/api/auth/callback/google"
    }
  }
});

// src/middleware/auth.ts
import { fromNodeHeaders } from "better-auth/node";
var auth2 = (...roles) => {
  return async (req, res, next) => {
    try {
      const headers = fromNodeHeaders(req.headers);
      const session = await auth.api.getSession({
        headers
      });
      if (!session) {
        return res.status(401).json({
          success: false,
          message: "You are not authorized!"
        });
      }
      const user = {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        role: session.user.role,
        emailVerified: session.user.emailVerified
      };
      if (user.role === "PROVIDER" /* PROVIDER */) {
        const profile = await prisma.providerProfile.findUnique({
          where: { userId: user.id },
          select: { id: true }
        });
        if (profile) {
          user.providerProfile = { id: profile.id };
        }
      }
      req.user = user;
      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden! You don't have permission to access this resources!"
        });
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};
var auth_default = auth2;

// src/modules/menu/menu.controller.ts
var createMeal2 = async (req, res) => {
  try {
    const providerId = req.user?.providerProfile?.id;
    if (!providerId || req.user?.role !== "PROVIDER" /* PROVIDER */) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Only providers can create meals."
      });
    }
    const {
      title,
      description,
      price,
      categoryId,
      cuisine,
      dietType,
      image
    } = req.body;
    if (!title || !price || !categoryId || !cuisine || !dietType) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }
    if (typeof price !== "number" || price <= 0) {
      return res.status(400).json({
        success: false,
        message: "Price must be a number greater than 0"
      });
    }
    if (image && typeof image !== "string") {
      return res.status(400).json({
        success: false,
        message: "Image must be a valid URL string"
      });
    }
    const meal = await mealService.createMeal(providerId, {
      title,
      description,
      price,
      categoryId,
      cuisine,
      dietType,
      image
    });
    return res.status(201).json({
      success: true,
      data: meal
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message || "Failed to create meal"
    });
  }
};
var getAllMeals2 = async (req, res) => {
  try {
    const {
      search,
      categoryId,
      providerId,
      cuisine,
      dietType,
      minPrice,
      maxPrice,
      available
    } = req.query;
    const result = await mealService.getAllMeals({
      search: typeof search === "string" ? search : void 0,
      categoryId: typeof categoryId === "string" ? categoryId : void 0,
      providerId: typeof providerId === "string" ? providerId : void 0,
      cuisine: typeof cuisine === "string" ? cuisine : void 0,
      dietType: typeof dietType === "string" ? dietType : void 0,
      available: available === "true" ? true : available === "false" ? false : void 0,
      minPrice: typeof minPrice === "string" ? Number(minPrice) : void 0,
      maxPrice: typeof maxPrice === "string" ? Number(maxPrice) : void 0
    });
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Meals fetch failed",
      error: error.message
    });
  }
};
var getMyMeals2 = async (req, res) => {
  try {
    const user = req.user;
    if (!user || user.role !== "PROVIDER") {
      return res.status(403).json({
        success: false,
        message: "Forbidden"
      });
    }
    const providerId = user.providerProfile?.id;
    if (!providerId) {
      return res.status(400).json({
        success: false,
        message: "Provider profile not found"
      });
    }
    const result = await mealService.getMyMeals(
      providerId,
      req.query
    );
    res.status(200).json({
      success: true,
      ...result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to fetch provider meals",
      error: error.message
    });
  }
};
var getMealById2 = async (req, res) => {
  try {
    const { mealId } = req.params;
    const result = await mealService.getMealById(mealId);
    res.status(200).json(result);
  } catch (e) {
    res.status(404).json({
      success: false,
      message: e.message || "Meal not found"
    });
  }
};
var updateMeal2 = async (req, res) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const payload = req.body;
  const result = await mealService.updateMeal(id, payload);
  res.status(200).json({
    success: true,
    data: result
  });
};
var deleteMeal2 = async (req, res) => {
  try {
    const user = req.user;
    const { mealId } = req.params;
    const result = await mealService.deleteMeal(mealId, user?.id);
    res.status(200).json({
      success: true,
      message: "Meal deleted successfully!",
      data: result
    });
  } catch (e) {
    res.status(400).json({
      error: "meal delete failed!",
      details: e
    });
  }
};
var MealController = {
  createMeal: createMeal2,
  getAllMeals: getAllMeals2,
  getMyMeals: getMyMeals2,
  getMealById: getMealById2,
  updateMeal: updateMeal2,
  deleteMeal: deleteMeal2
};

// src/modules/menu/menu.route.ts
var router = express.Router();
router.post(
  "/",
  auth_default("PROVIDER" /* PROVIDER */),
  MealController.createMeal
);
router.get("/", MealController.getAllMeals);
router.get(
  "/myMeals",
  auth_default("PROVIDER" /* PROVIDER */),
  MealController.getMyMeals
);
router.get(
  "/:mealId",
  MealController.getMealById
);
router.delete(
  "/:mealId",
  auth_default("PROVIDER" /* PROVIDER */),
  MealController.deleteMeal
);
router.delete(
  "/:mealId",
  auth_default("PROVIDER" /* PROVIDER */),
  MealController.updateMeal
);
var MealRouter = router;

// src/app.ts
import { toNodeHandler } from "better-auth/node";
import cors from "cors";

// src/modules/provider/provider.route.ts
import express2 from "express";

// src/modules/provider/provider.services.ts
var createProviderProfile = async (data, userId) => {
  return await prisma.$transaction(async (tx) => {
    const existingProvider = await tx.providerProfile.findUnique({
      where: { userId }
    });
    if (existingProvider) {
      throw new Error("Provider profile already exists for this user");
    }
    const provider = await tx.providerProfile.create({
      data: {
        ...data,
        userId
      }
    });
    await tx.user.update({
      where: { id: userId },
      data: {
        role: "PROVIDER"
      }
    });
    return provider;
  });
};
var getAllProviders = async ({
  search,
  page,
  limit,
  skip,
  sortBy,
  sortOrder
}) => {
  const andConditions = [];
  if (search) {
    andConditions.push({
      OR: [
        {
          restaurantName: {
            contains: search,
            mode: "insensitive"
          }
        },
        {
          address: {
            contains: search,
            mode: "insensitive"
          }
        },
        {
          phone: {
            contains: search
          }
        }
      ]
    });
  }
  const providers = await prisma.providerProfile.findMany({
    take: limit,
    skip,
    where: {
      AND: andConditions
    },
    orderBy: {
      [sortBy]: sortOrder
    },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          role: true
        }
      },
      meals: {
        select: {
          id: true,
          available: true,
          createdAt: true,
          image: true,
          description: true,
          price: true,
          title: true
        }
      },
      _count: {
        select: {
          meals: true,
          orders: true
        }
      }
    }
  });
  const total = await prisma.providerProfile.count({
    where: {
      AND: andConditions
    }
  });
  return {
    data: providers,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  };
};
var getProviderById = async (id) => {
  const provider = await prisma.providerProfile.findUnique({
    where: { id },
    include: {
      meals: {
        select: {
          id: true,
          title: true,
          price: true,
          image: true,
          available: true
        }
      }
    }
  });
  if (!provider) {
    throw new Error("Provider not found");
  }
  return provider;
};
var deleteProvider = async (providerId) => {
  const providerProfile = await prisma.providerProfile.findUnique({
    where: { id: providerId }
  });
  if (!providerProfile) {
    throw new Error("Provider not found!");
  }
  return await prisma.providerProfile.delete({
    where: { id: providerId }
  });
};
var providerService = {
  createProviderProfile,
  getAllProviders,
  getProviderById,
  deleteProvider
};

// src/helper/paginationSortingHelper.ts
var paginationSortingHelper = (options) => {
  const page = Number(options.page) || 1;
  const limit = Number(options.limit) || 10;
  const skip = (page - 1) * limit;
  const sortBy = options.sortBy || "createdAt";
  const sortOrder = options.sortOrder || "desc";
  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder
  };
};
var paginationSortingHelper_default = paginationSortingHelper;

// src/modules/provider/provider.controller.ts
var createProvider = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }
    const { restaurantName, address, phone, description } = req.body;
    if (!restaurantName || !address || !phone || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }
    const result = await providerService.createProviderProfile(
      {
        restaurantName,
        address,
        phone,
        description
      },
      user.id
    );
    return res.status(201).json({
      success: true,
      message: "Provider profile created successfully",
      data: result
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: e.message || "Provider profile creation failed"
    });
  }
};
var getAllProviders2 = async (req, res) => {
  try {
    const { search } = req.query;
    const searchString = typeof search === "string" ? search : void 0;
    const { page, limit, skip, sortBy, sortOrder } = paginationSortingHelper_default(req.query);
    const result = await providerService.getAllProviders({
      search: searchString,
      page,
      limit,
      skip,
      sortBy,
      sortOrder
    });
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({
      error: "Failed to fetch providers",
      details: e
    });
  }
};
var getProviderById2 = async (req, res) => {
  try {
    const { providerId } = req.params;
    const result = await providerService.getProviderById(providerId);
    res.status(200).json(result);
  } catch (e) {
    res.status(404).json({
      success: false,
      message: e.message || "provider not found"
    });
  }
};
var deleteProvider2 = async (req, res) => {
  try {
    const user = req.user;
    const { providerId } = req.params;
    const result = await providerService.deleteProvider(providerId);
    res.status(200).json({
      success: true,
      message: "provider deleted successfully!",
      data: result
    });
  } catch (e) {
    res.status(400).json({
      error: "provider delete failed!",
      details: e
    });
  }
};
var providerController = {
  createProvider,
  getAllProviders: getAllProviders2,
  getProviderById: getProviderById2,
  deleteProvider: deleteProvider2
};

// src/modules/provider/provider.route.ts
var router2 = express2.Router();
router2.post(
  "/",
  auth_default(),
  providerController.createProvider
);
router2.get(
  "/",
  providerController.getAllProviders
);
router2.get("/:providerId", providerController.getProviderById);
router2.delete("/:providerId", auth_default("ADMIN" /* ADMIN */), providerController.deleteProvider);
var providerRouter = router2;

// src/modules/category/category.route.ts
import express3 from "express";

// src/modules/category/category.services.ts
var createCategory = async (data) => {
  const exists = await prisma.category.findUnique({
    where: { name: data.name }
  });
  if (exists) {
    throw new Error("Category already exists");
  }
  return prisma.category.create({
    data
  });
};
var getAllCategories = async () => {
  return prisma.category.findMany({
    // where: { isActive: true },
    orderBy: { createdAt: "asc" }
  });
};
var categoryService = {
  createCategory,
  getAllCategories
  // toggleCategory
};

// src/modules/category/category.controller.ts
var createCategory2 = async (req, res) => {
  try {
    const result = await categoryService.createCategory(req.body);
    res.status(201).json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
var getAllCategories2 = async (_req, res) => {
  try {
    const result = await categoryService.getAllCategories();
    res.status(200).json({
      success: true,
      data: result
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to fetch categories"
    });
  }
};
var CategoryController = {
  createCategory: createCategory2,
  getAllCategories: getAllCategories2
  //toggleCategory
};

// src/modules/category/category.route.ts
var router3 = express3.Router();
router3.post(
  "/admin/categories",
  auth_default("ADMIN" /* ADMIN */),
  CategoryController.createCategory
);
router3.get("/categories", CategoryController.getAllCategories);
var categoryRouter = router3;

// src/modules/order/order.route.ts
import express4 from "express";

// src/modules/order/order.services.ts
var createOrder = async (payload) => {
  const mealIds = payload.items.map((item) => item.mealId);
  const meals = await prisma.meal.findMany({
    where: {
      id: { in: mealIds },
      available: true,
      providerId: payload.providerId
    }
  });
  if (meals.length !== payload.items.length) {
    throw new Error("Unavailable meal detected");
  }
  let totalAmount = 0;
  const orderItems = payload.items.map((item) => {
    const meal = meals.find((m) => m.id === item.mealId);
    const itemTotal = meal.price * item.quantity;
    totalAmount += itemTotal;
    return {
      mealId: meal.id,
      quantity: item.quantity,
      price: meal.price
    };
  });
  const order = await prisma.order.create({
    data: {
      customerId: payload.customerId,
      providerId: payload.providerId,
      address: payload.address,
      totalAmount,
      paymentMethod: payload.paymentMethod,
      paymentStatus: "PENDING",
      status: payload.paymentMethod === "COD" ? "PLACED" : "PENDING",
      items: {
        create: orderItems
      }
    },
    include: {
      items: true
    }
  });
  return order;
};
var getAllOrders = async () => {
  return prisma.order.findMany({
    orderBy: { createdAt: "desc" }
  });
};
var getCustomerOrders = async (customerId) => {
  return prisma.order.findMany({
    where: { customerId },
    orderBy: { createdAt: "desc" }
  });
};
var getProviderOrders = async (userId) => {
  const providerProfile = await prisma.providerProfile.findUnique({
    where: { userId }
  });
  if (!providerProfile) {
    throw new Error("Provider profile not found");
  }
  return prisma.order.findMany({
    where: { providerId: providerProfile.id },
    orderBy: { createdAt: "desc" }
  });
};
var getOrderById = async (id) => {
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      items: {
        include: {
          meal: true
        }
      },
      customer: {
        select: { id: true, email: true }
      },
      provider: {
        select: { id: true, restaurantName: true }
      }
    }
  });
  if (!order) {
    throw new Error("Order not found");
  }
  return order;
};
var updateOrder = async (id, status) => {
  const order = await prisma.order.findUnique({ where: { id } });
  if (!order) {
    throw new Error("Order not found");
  }
  return prisma.order.update({
    where: { id },
    data: { status }
  });
};
var orderService = {
  createOrder,
  getAllOrders,
  getCustomerOrders,
  getProviderOrders,
  getOrderById,
  updateOrder
};

// src/modules/order/order.controller.ts
var createOrder2 = async (req, res) => {
  try {
    const { items, paymentMethod, providerId, address } = req.body;
    const parsedItems = typeof items === "string" ? JSON.parse(items) : items;
    const result = await orderService.createOrder({
      customerId: req.user.id,
      providerId,
      address,
      paymentMethod,
      items: parsedItems
    });
    res.status(201).json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
var getAllOrders2 = async (_req, res) => {
  const result = await orderService.getAllOrders();
  res.status(200).json({
    success: true,
    data: result
  });
};
var getMyOrders = async (req, res) => {
  const result = await orderService.getCustomerOrders(req.user.id);
  res.status(200).json({
    success: true,
    data: result
  });
};
var getProviderOrders2 = async (req, res) => {
  const orders = await orderService.getProviderOrders(req.user.id);
  res.status(200).json({
    success: true,
    data: orders
  });
};
var getOrderById2 = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await orderService.getOrderById(orderId);
    const user = req.user;
    if (user.role === "CUSTOMER" && order.customerId !== user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized"
      });
    }
    if (user.role === "PROVIDER" && !user.providerProfile) {
      return res.status(403).json({
        success: false,
        message: "Provider profile not found"
      });
    }
    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};
var updateOrder2 = async (req, res) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Order ID is required"
    });
  }
  const { status } = req.body;
  if (!status) {
    return res.status(400).json({
      success: false,
      message: "Status is required"
    });
  }
  const result = await orderService.updateOrder(id, status);
  res.status(200).json({
    success: true,
    data: result
  });
};
var orderController = {
  createOrder: createOrder2,
  getAllOrders: getAllOrders2,
  getMyOrders,
  getProviderOrders: getProviderOrders2,
  getOrderById: getOrderById2,
  updateOrder: updateOrder2
};

// src/modules/order/order.route.ts
var router4 = express4.Router();
router4.post(
  "/",
  auth_default("CUSTOMER" /* CUSTOMER */),
  orderController.createOrder
);
router4.get(
  "/myOrders",
  auth_default("CUSTOMER" /* CUSTOMER */),
  orderController.getMyOrders
);
router4.get(
  "/providerOrders",
  auth_default("PROVIDER" /* PROVIDER */),
  orderController.getProviderOrders
);
router4.get(
  "/allOrders",
  auth_default("ADMIN" /* ADMIN */),
  orderController.getAllOrders
);
router4.get(
  "/:orderId",
  auth_default(
    "ADMIN" /* ADMIN */,
    "PROVIDER" /* PROVIDER */,
    "CUSTOMER" /* CUSTOMER */
  ),
  orderController.getOrderById
);
router4.patch("/:id", auth_default("PROVIDER" /* PROVIDER */), orderController.updateOrder);
var orderRouter = router4;

// src/modules/allUser/user.route.ts
import express5 from "express";

// src/modules/allUser/user.services.ts
var getAllUser = async () => {
  return prisma.user.findMany({
    orderBy: { createdAt: "desc" }
  });
};
var toggleUserStatus = async (id) => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new Error("User not found");
  const nextStatus = user.status === UserStatus.ACTIVE ? UserStatus.SUSPENDED : UserStatus.ACTIVE;
  return prisma.user.update({
    where: { id },
    data: { status: nextStatus }
  });
};
var userServices = {
  getAllUser,
  toggleUserStatus
};

// src/modules/allUser/user.controller.ts
var getAllUser2 = async (req, res) => {
  try {
    const user = req.user;
    console.log(user);
    if (!user || user.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: "Forbidden"
      });
    }
    const result = await userServices.getAllUser();
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to fetch all User",
      error: error.message
    });
  }
};
var toggleUserStatus2 = async (req, res) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const result = await userServices.toggleUserStatus(id);
  res.status(200).json({
    success: true,
    data: result
  });
};
var userController = {
  getAllUser: getAllUser2,
  toggleUserStatus: toggleUserStatus2
};

// src/modules/allUser/user.route.ts
var router5 = express5.Router();
router5.get(
  "/allUser",
  auth_default("ADMIN" /* ADMIN */),
  userController.getAllUser
);
router5.patch(
  "/user/:id",
  auth_default("ADMIN" /* ADMIN */),
  userController.toggleUserStatus
);
var userRouter = router5;

// src/modules/cart/cart.route.ts
import express6 from "express";

// src/modules/cart/cart.services.ts
var addToCart = async (userId, data) => {
  const { mealId, quantity } = data;
  const meal = await prisma.meal.findFirst({
    where: {
      id: mealId,
      available: true
    }
  });
  if (!meal) {
    throw new Error("Meal not available");
  }
  const providerId = meal.providerId;
  let cart = await prisma.cart.findFirst({
    where: {
      userId,
      providerId
    }
  });
  if (!cart) {
    cart = await prisma.cart.create({
      data: {
        userId,
        providerId
      }
    });
  }
  const existingItem = await prisma.cartItem.findFirst({
    where: {
      cartId: cart.id,
      mealId
    }
  });
  if (existingItem) {
    return prisma.cartItem.update({
      where: { id: existingItem.id },
      data: {
        quantity: existingItem.quantity + quantity,
        subtotal: (existingItem.quantity + quantity) * Number(meal.price)
      }
    });
  }
  return prisma.cartItem.create({
    data: {
      cartId: cart.id,
      mealId,
      quantity,
      subtotal: quantity * Number(meal.price)
    }
  });
};
var getMyCart = async (userId) => {
  return prisma.cart.findMany({
    where: { userId },
    include: {
      items: {
        include: {
          meal: true
        }
      }
    }
  });
};
var deleteCart = async (cartId) => {
  const cartItems = await prisma.cartItem.findUnique({
    where: { id: cartId }
  });
  if (!cartItems) {
    throw new Error("item not found!");
  }
  return await prisma.cartItem.delete({
    where: { id: cartId }
  });
};
var cartService = {
  addToCart,
  getMyCart,
  deleteCart
};

// src/modules/cart/cart.controller.ts
var addToCart2 = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId || req.user?.role !== "CUSTOMER" /* CUSTOMER */) {
      return res.status(403).json({
        success: false,
        message: "Only customers can add to cart"
      });
    }
    const result = await cartService.addToCart(userId, req.body);
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
var getAllCart = async (_req, res) => {
  const userId = _req.user?.id;
  try {
    const result = await cartService.getMyCart(userId);
    res.status(200).json({
      success: true,
      data: result
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to fetch cart"
    });
  }
};
var deleteCart2 = async (req, res) => {
  try {
    const { cartId } = req.params;
    const result = await cartService.deleteCart(cartId);
    res.status(200).json({
      success: true,
      message: "cart deleted successfully!",
      data: result
    });
  } catch (e) {
    res.status(400).json({
      error: "cart delete failed!",
      details: e
    });
  }
};
var cartController = {
  addToCart: addToCart2,
  getAllCart,
  deleteCart: deleteCart2
};

// src/modules/cart/cart.route.ts
var router6 = express6.Router();
router6.post(
  "/cart",
  auth_default("CUSTOMER" /* CUSTOMER */),
  cartController.addToCart
);
router6.get(
  "/allCart",
  auth_default("CUSTOMER" /* CUSTOMER */),
  cartController.getAllCart
);
router6.delete(
  "/:cartId",
  auth_default("CUSTOMER" /* CUSTOMER */),
  cartController.deleteCart
);
var cartRouter = router6;

// src/modules/review/review.route.ts
import express7 from "express";

// src/modules/review/review.services.ts
var createReview = async (data) => {
  const orderItem = await prisma.orderItem.findFirst({
    where: {
      mealId: data.mealId,
      order: {
        customerId: data.userId,
        status: "DELIVERED"
      }
    }
  });
  if (!orderItem) {
    throw new Error("You can only review meals from delivered orders");
  }
  const existing = await prisma.review.findFirst({
    where: {
      userId: data.userId,
      mealId: data.mealId
    }
  });
  if (existing) {
    throw new Error("You already reviewed this meal");
  }
  return prisma.review.create({
    data: {
      userId: data.userId,
      mealId: data.mealId,
      rating: data.rating,
      comment: data.comment
    }
  });
};
var getAllReview = async () => {
  return prisma.review.findMany({
    orderBy: { createdAt: "asc" }
  });
};
var reviewServices = {
  createReview,
  getAllReview
};

// src/modules/review/review.controller.ts
var createReview2 = async (req, res) => {
  try {
    const result = await reviewServices.createReview({
      userId: req.user.id,
      mealId: req.body.mealId,
      rating: Number(req.body.rating),
      comment: req.body.comment
    });
    res.status(201).json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
var getAllReview2 = async (_req, res) => {
  try {
    const result = await reviewServices.getAllReview();
    res.status(200).json({
      success: true,
      data: result
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Failed to fetch review"
    });
  }
};
var reviewController = {
  createReview: createReview2,
  getAllReview: getAllReview2
};

// src/modules/review/review.route.ts
var router7 = express7.Router();
router7.post(
  "/review",
  auth_default("CUSTOMER" /* CUSTOMER */),
  reviewController.createReview
);
router7.get("/allReview", reviewController.getAllReview);
var reviewRouter = router7;

// src/modules/payment/payment.route.ts
import express8 from "express";

// src/modules/payment/payment.services.ts
import SSLCommerzPayment from "sslcommerz-lts";
var store_id = process.env.SSL_STORE_ID;
var store_passwd = process.env.SSL_STORE_PASS;
var is_live = false;
var initiatePayment = async (orderId) => {
  const order = await prisma.order.findUnique({
    where: { id: orderId }
  });
  console.log("Order found:", order);
  if (!order) throw new Error("Order not found");
  const data = {
    total_amount: order.totalAmount,
    currency: "BDT",
    tran_id: order.id,
    success_url: "https://assignment4-backend-red.vercel.app/payment/success",
    fail_url: "https://assignment4-backend-red.vercel.app/payment/fail",
    cancel_url: "https://assignment4-backend-red.vercel.app/payment/cancel",
    // Customer info
    cus_name: "Customer",
    cus_email: "test@test.com",
    cus_add1: order.address,
    // ← was order.totalAmount, fix this too
    cus_phone: "01700000000",
    cus_city: "Dhaka",
    cus_country: "Bangladesh",
    // Shipping info ← THESE WERE MISSING
    shipping_method: "NO",
    ship_name: "Customer",
    ship_add1: order.address,
    ship_city: "Dhaka",
    ship_country: "Bangladesh",
    // Product info
    product_name: "Food Order",
    product_category: "Food",
    product_profile: "general",
    num_of_item: 1
  };
  const sslcz = new SSLCommerzPayment(
    store_id,
    store_passwd,
    is_live
  );
  const apiResponse = await sslcz.init(data);
  console.log("SSLCommerz response:", apiResponse);
  if (!apiResponse.GatewayPageURL) {
    throw new Error(apiResponse.failedreason || "No gateway URL");
  }
  return apiResponse.GatewayPageURL;
};

// src/modules/payment/payment.controller.ts
var initiatePayment2 = async (req, res) => {
  try {
    const { orderId } = req.body;
    console.log(orderId);
    if (!orderId) {
      res.status(400).json({ message: "orderId is required" });
      return;
    }
    const url = await initiatePayment(orderId);
    res.json({ url });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
var paymentSuccess = async (req, res) => {
  try {
    const { tran_id } = req.body;
    await prisma.order.update({
      where: { id: tran_id },
      data: {
        paymentStatus: "PAID",
        status: "PLACED",
        transactionId: tran_id
      }
    });
    res.redirect("https://assignment4-client-lilac.vercel.app/dashboard/payment-success");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
var paymentFail = async (req, res) => {
  try {
    const { tran_id } = req.body;
    await prisma.order.update({
      where: { id: tran_id },
      data: {
        paymentStatus: "FAILED",
        status: "CANCELLED"
      }
    });
    res.redirect("https://assignment4-client-lilac.vercel.app/payment-fail");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
var paymentCancel = async (req, res) => {
  try {
    const { tran_id } = req.body;
    await prisma.order.update({
      where: { id: tran_id },
      data: {
        paymentStatus: "FAILED",
        status: "CANCELLED"
      }
    });
    res.redirect("https://assignment4-client-lilac.vercel.app/payment-cancel");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// src/modules/payment/payment.route.ts
var router8 = express8.Router();
router8.post("/initiate", initiatePayment2);
router8.post("/success", paymentSuccess);
router8.post("/fail", paymentFail);
router8.post("/cancel", paymentCancel);
var payment_route_default = router8;

// src/app.ts
var app = express9();
app.use(express9.json());
app.use(express9.urlencoded({ extended: true }));
var allowedOrigins = [
  process.env.APP_URL || "http://localhost:3000",
  process.env.PROD_APP_URL
].filter(Boolean);
var openCors = cors({ origin: "*" });
app.post("/payment/success", openCors, (req, res, next) => next());
app.post("/payment/fail", openCors, (req, res, next) => next());
app.post("/payment/cancel", openCors, (req, res, next) => next());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      const isAllowed = allowedOrigins.includes(origin) || /^https:\/\/next-blog-client.*\.vercel\.app$/.test(origin) || /^https:\/\/.*\.vercel\.app$/.test(origin) || /^https:\/\/.*\.sslcommerz\.com$/.test(origin);
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
    exposedHeaders: ["Set-Cookie"]
  })
);
app.set("trust proxy", 1);
app.use("/api/auth", toNodeHandler(auth));
app.use("/provider/meals", MealRouter);
app.use("/category", categoryRouter);
app.use("/provider", providerRouter);
app.use("/order", orderRouter);
app.use("/admin", userRouter);
app.use("/customer", cartRouter);
app.use("/customer", reviewRouter);
app.use("/payment", payment_route_default);
app.get("/", (req, res) => {
  res.send("Hello, World!");
});
var app_default = app;

// src/server.ts
var PORT = process.env.PORT || 4e3;
async function main() {
  try {
    prisma.$connect();
    console.log("database connect successfully");
    app_default.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("An error occurred:", err);
    await prisma.$disconnect();
    process.exit(1);
  }
}
main();
