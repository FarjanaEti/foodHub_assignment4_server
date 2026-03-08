// src/app.ts
import express8 from "express";

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
  "inlineSchema": 'generator client {\n  provider = "prisma-client"\n  output   = "../generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nmodel User {\n  id              String           @id @default(uuid())\n  name            String\n  email           String           @unique\n  role            UserRole         @default(CUSTOMER)\n  status          UserStatus       @default(ACTIVE)\n  phone           String?\n  createdAt       DateTime         @default(now())\n  updatedAt       DateTime         @updatedAt\n  emailVerified   Boolean          @default(false)\n  image           String?\n  accounts        Account[]\n  orders          Order[]\n  providerProfile ProviderProfile?\n  reviews         Review[]\n  sessions        Session[]\n  carts           Cart[]\n\n  @@map("users")\n}\n\nmodel ProviderProfile {\n  id             String   @id @default(uuid())\n  userId         String   @unique\n  restaurantName String\n  address        String\n  phone          String\n  description    String?\n  createdAt      DateTime @default(now())\n  updatedAt      DateTime @updatedAt\n  meals          Meal[]\n  orders         Order[]\n  user           User     @relation(fields: [userId], references: [id])\n\n  @@map("provider_profiles")\n}\n\nmodel Category {\n  id        String   @id @default(uuid())\n  name      String   @unique\n  isActive  Boolean  @default(true)\n  createdAt DateTime @default(now())\n  meals     Meal[]\n\n  @@map("categories")\n}\n\nmodel Meal {\n  id          String  @id @default(uuid())\n  title       String\n  description String?\n  price       Float\n  image       String?\n  available   Boolean @default(true)\n\n  cuisine  String?\n  dietType String?\n\n  providerId String\n  categoryId String\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  category Category        @relation(fields: [categoryId], references: [id])\n  provider ProviderProfile @relation(fields: [providerId], references: [id])\n\n  orderItems OrderItem[]\n  reviews    Review[]\n  cartItems  CartItem[]\n\n  @@map("meals")\n}\n\nmodel Cart {\n  id         String   @id @default(uuid())\n  userId     String\n  providerId String\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n\n  items CartItem[]\n\n  customer User @relation(fields: [userId], references: [id])\n}\n\nmodel CartItem {\n  id       String   @id @default(uuid())\n  cartId   String\n  mealId   String\n  quantity Int\n  subtotal Decimal? @db.Decimal(10, 2)\n  cart     Cart     @relation(fields: [cartId], references: [id])\n  meal     Meal     @relation(fields: [mealId], references: [id])\n\n  @@unique([cartId, mealId])\n}\n\nmodel Order {\n  id          String          @id @default(uuid())\n  customerId  String\n  providerId  String\n  status      OrderStatus     @default(PLACED)\n  address     String\n  totalAmount Float\n  createdAt   DateTime        @default(now())\n  updatedAt   DateTime        @updatedAt\n  items       OrderItem[]\n  customer    User            @relation(fields: [customerId], references: [id])\n  provider    ProviderProfile @relation(fields: [providerId], references: [id])\n\n  @@map("orders")\n}\n\nmodel OrderItem {\n  id       String @id @default(uuid())\n  orderId  String\n  mealId   String\n  quantity Int\n  price    Float\n  meal     Meal   @relation(fields: [mealId], references: [id])\n  order    Order  @relation(fields: [orderId], references: [id])\n\n  @@map("order_items")\n}\n\nmodel Review {\n  id        String   @id @default(uuid())\n  rating    Int\n  comment   String?\n  userId    String\n  mealId    String\n  createdAt DateTime @default(now())\n  meal      Meal     @relation(fields: [mealId], references: [id])\n  user      User     @relation(fields: [userId], references: [id])\n\n  @@unique([userId, mealId])\n  @@map("reviews")\n}\n\nmodel Session {\n  id        String   @id\n  expiresAt DateTime\n  token     String   @unique\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n  ipAddress String?\n  userAgent String?\n  userId    String\n  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@index([userId])\n  @@map("session")\n}\n\nmodel Account {\n  id                    String    @id\n  accountId             String\n  providerId            String\n  userId                String\n  accessToken           String?\n  refreshToken          String?\n  idToken               String?\n  accessTokenExpiresAt  DateTime?\n  refreshTokenExpiresAt DateTime?\n  scope                 String?\n  password              String?\n  createdAt             DateTime  @default(now())\n  updatedAt             DateTime  @updatedAt\n  user                  User      @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  @@index([userId])\n  @@map("account")\n}\n\nmodel Verification {\n  id         String   @id\n  identifier String\n  value      String\n  expiresAt  DateTime\n  createdAt  DateTime @default(now())\n  updatedAt  DateTime @updatedAt\n\n  @@index([identifier])\n  @@map("verification")\n}\n\nenum UserRole {\n  CUSTOMER\n  PROVIDER\n  ADMIN\n}\n\nenum UserStatus {\n  ACTIVE\n  SUSPENDED\n}\n\nenum OrderStatus {\n  PLACED\n  PREPARING\n  READY\n  DELIVERED\n  CANCELLED\n}\n',
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
config.runtimeDataModel = JSON.parse('{"models":{"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"role","kind":"enum","type":"UserRole"},{"name":"status","kind":"enum","type":"UserStatus"},{"name":"phone","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"emailVerified","kind":"scalar","type":"Boolean"},{"name":"image","kind":"scalar","type":"String"},{"name":"accounts","kind":"object","type":"Account","relationName":"AccountToUser"},{"name":"orders","kind":"object","type":"Order","relationName":"OrderToUser"},{"name":"providerProfile","kind":"object","type":"ProviderProfile","relationName":"ProviderProfileToUser"},{"name":"reviews","kind":"object","type":"Review","relationName":"ReviewToUser"},{"name":"sessions","kind":"object","type":"Session","relationName":"SessionToUser"},{"name":"carts","kind":"object","type":"Cart","relationName":"CartToUser"}],"dbName":"users"},"ProviderProfile":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"restaurantName","kind":"scalar","type":"String"},{"name":"address","kind":"scalar","type":"String"},{"name":"phone","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"meals","kind":"object","type":"Meal","relationName":"MealToProviderProfile"},{"name":"orders","kind":"object","type":"Order","relationName":"OrderToProviderProfile"},{"name":"user","kind":"object","type":"User","relationName":"ProviderProfileToUser"}],"dbName":"provider_profiles"},"Category":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"isActive","kind":"scalar","type":"Boolean"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"meals","kind":"object","type":"Meal","relationName":"CategoryToMeal"}],"dbName":"categories"},"Meal":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"price","kind":"scalar","type":"Float"},{"name":"image","kind":"scalar","type":"String"},{"name":"available","kind":"scalar","type":"Boolean"},{"name":"cuisine","kind":"scalar","type":"String"},{"name":"dietType","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"categoryId","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"category","kind":"object","type":"Category","relationName":"CategoryToMeal"},{"name":"provider","kind":"object","type":"ProviderProfile","relationName":"MealToProviderProfile"},{"name":"orderItems","kind":"object","type":"OrderItem","relationName":"MealToOrderItem"},{"name":"reviews","kind":"object","type":"Review","relationName":"MealToReview"},{"name":"cartItems","kind":"object","type":"CartItem","relationName":"CartItemToMeal"}],"dbName":"meals"},"Cart":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"items","kind":"object","type":"CartItem","relationName":"CartToCartItem"},{"name":"customer","kind":"object","type":"User","relationName":"CartToUser"}],"dbName":null},"CartItem":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"cartId","kind":"scalar","type":"String"},{"name":"mealId","kind":"scalar","type":"String"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"subtotal","kind":"scalar","type":"Decimal"},{"name":"cart","kind":"object","type":"Cart","relationName":"CartToCartItem"},{"name":"meal","kind":"object","type":"Meal","relationName":"CartItemToMeal"}],"dbName":null},"Order":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"customerId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"OrderStatus"},{"name":"address","kind":"scalar","type":"String"},{"name":"totalAmount","kind":"scalar","type":"Float"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"items","kind":"object","type":"OrderItem","relationName":"OrderToOrderItem"},{"name":"customer","kind":"object","type":"User","relationName":"OrderToUser"},{"name":"provider","kind":"object","type":"ProviderProfile","relationName":"OrderToProviderProfile"}],"dbName":"orders"},"OrderItem":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"orderId","kind":"scalar","type":"String"},{"name":"mealId","kind":"scalar","type":"String"},{"name":"quantity","kind":"scalar","type":"Int"},{"name":"price","kind":"scalar","type":"Float"},{"name":"meal","kind":"object","type":"Meal","relationName":"MealToOrderItem"},{"name":"order","kind":"object","type":"Order","relationName":"OrderToOrderItem"}],"dbName":"order_items"},"Review":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"rating","kind":"scalar","type":"Int"},{"name":"comment","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"mealId","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"meal","kind":"object","type":"Meal","relationName":"MealToReview"},{"name":"user","kind":"object","type":"User","relationName":"ReviewToUser"}],"dbName":"reviews"},"Session":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"token","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"ipAddress","kind":"scalar","type":"String"},{"name":"userAgent","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"SessionToUser"}],"dbName":"session"},"Account":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"accountId","kind":"scalar","type":"String"},{"name":"providerId","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"accessToken","kind":"scalar","type":"String"},{"name":"refreshToken","kind":"scalar","type":"String"},{"name":"idToken","kind":"scalar","type":"String"},{"name":"accessTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"refreshTokenExpiresAt","kind":"scalar","type":"DateTime"},{"name":"scope","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"},{"name":"user","kind":"object","type":"User","relationName":"AccountToUser"}],"dbName":"account"},"Verification":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"identifier","kind":"scalar","type":"String"},{"name":"value","kind":"scalar","type":"String"},{"name":"expiresAt","kind":"scalar","type":"DateTime"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"verification"}},"enums":{},"types":{}}');
config.parameterizationSchema = {
  strings: JSON.parse('["where","orderBy","cursor","user","accounts","meals","_count","category","orders","provider","orderItems","meal","reviews","items","customer","cart","cartItems","order","providerProfile","sessions","carts","User.findUnique","User.findUniqueOrThrow","User.findFirst","User.findFirstOrThrow","User.findMany","data","User.createOne","User.createMany","User.createManyAndReturn","User.updateOne","User.updateMany","User.updateManyAndReturn","create","update","User.upsertOne","User.deleteOne","User.deleteMany","having","_min","_max","User.groupBy","User.aggregate","ProviderProfile.findUnique","ProviderProfile.findUniqueOrThrow","ProviderProfile.findFirst","ProviderProfile.findFirstOrThrow","ProviderProfile.findMany","ProviderProfile.createOne","ProviderProfile.createMany","ProviderProfile.createManyAndReturn","ProviderProfile.updateOne","ProviderProfile.updateMany","ProviderProfile.updateManyAndReturn","ProviderProfile.upsertOne","ProviderProfile.deleteOne","ProviderProfile.deleteMany","ProviderProfile.groupBy","ProviderProfile.aggregate","Category.findUnique","Category.findUniqueOrThrow","Category.findFirst","Category.findFirstOrThrow","Category.findMany","Category.createOne","Category.createMany","Category.createManyAndReturn","Category.updateOne","Category.updateMany","Category.updateManyAndReturn","Category.upsertOne","Category.deleteOne","Category.deleteMany","Category.groupBy","Category.aggregate","Meal.findUnique","Meal.findUniqueOrThrow","Meal.findFirst","Meal.findFirstOrThrow","Meal.findMany","Meal.createOne","Meal.createMany","Meal.createManyAndReturn","Meal.updateOne","Meal.updateMany","Meal.updateManyAndReturn","Meal.upsertOne","Meal.deleteOne","Meal.deleteMany","_avg","_sum","Meal.groupBy","Meal.aggregate","Cart.findUnique","Cart.findUniqueOrThrow","Cart.findFirst","Cart.findFirstOrThrow","Cart.findMany","Cart.createOne","Cart.createMany","Cart.createManyAndReturn","Cart.updateOne","Cart.updateMany","Cart.updateManyAndReturn","Cart.upsertOne","Cart.deleteOne","Cart.deleteMany","Cart.groupBy","Cart.aggregate","CartItem.findUnique","CartItem.findUniqueOrThrow","CartItem.findFirst","CartItem.findFirstOrThrow","CartItem.findMany","CartItem.createOne","CartItem.createMany","CartItem.createManyAndReturn","CartItem.updateOne","CartItem.updateMany","CartItem.updateManyAndReturn","CartItem.upsertOne","CartItem.deleteOne","CartItem.deleteMany","CartItem.groupBy","CartItem.aggregate","Order.findUnique","Order.findUniqueOrThrow","Order.findFirst","Order.findFirstOrThrow","Order.findMany","Order.createOne","Order.createMany","Order.createManyAndReturn","Order.updateOne","Order.updateMany","Order.updateManyAndReturn","Order.upsertOne","Order.deleteOne","Order.deleteMany","Order.groupBy","Order.aggregate","OrderItem.findUnique","OrderItem.findUniqueOrThrow","OrderItem.findFirst","OrderItem.findFirstOrThrow","OrderItem.findMany","OrderItem.createOne","OrderItem.createMany","OrderItem.createManyAndReturn","OrderItem.updateOne","OrderItem.updateMany","OrderItem.updateManyAndReturn","OrderItem.upsertOne","OrderItem.deleteOne","OrderItem.deleteMany","OrderItem.groupBy","OrderItem.aggregate","Review.findUnique","Review.findUniqueOrThrow","Review.findFirst","Review.findFirstOrThrow","Review.findMany","Review.createOne","Review.createMany","Review.createManyAndReturn","Review.updateOne","Review.updateMany","Review.updateManyAndReturn","Review.upsertOne","Review.deleteOne","Review.deleteMany","Review.groupBy","Review.aggregate","Session.findUnique","Session.findUniqueOrThrow","Session.findFirst","Session.findFirstOrThrow","Session.findMany","Session.createOne","Session.createMany","Session.createManyAndReturn","Session.updateOne","Session.updateMany","Session.updateManyAndReturn","Session.upsertOne","Session.deleteOne","Session.deleteMany","Session.groupBy","Session.aggregate","Account.findUnique","Account.findUniqueOrThrow","Account.findFirst","Account.findFirstOrThrow","Account.findMany","Account.createOne","Account.createMany","Account.createManyAndReturn","Account.updateOne","Account.updateMany","Account.updateManyAndReturn","Account.upsertOne","Account.deleteOne","Account.deleteMany","Account.groupBy","Account.aggregate","Verification.findUnique","Verification.findUniqueOrThrow","Verification.findFirst","Verification.findFirstOrThrow","Verification.findMany","Verification.createOne","Verification.createMany","Verification.createManyAndReturn","Verification.updateOne","Verification.updateMany","Verification.updateManyAndReturn","Verification.upsertOne","Verification.deleteOne","Verification.deleteMany","Verification.groupBy","Verification.aggregate","AND","OR","NOT","id","identifier","value","expiresAt","createdAt","updatedAt","equals","in","notIn","lt","lte","gt","gte","not","contains","startsWith","endsWith","accountId","providerId","userId","accessToken","refreshToken","idToken","accessTokenExpiresAt","refreshTokenExpiresAt","scope","password","token","ipAddress","userAgent","rating","comment","mealId","orderId","quantity","price","customerId","OrderStatus","status","address","totalAmount","cartId","subtotal","title","description","image","available","cuisine","dietType","categoryId","name","isActive","every","some","none","restaurantName","phone","email","UserRole","role","UserStatus","emailVerified","cartId_mealId","userId_mealId","is","isNot","connectOrCreate","upsert","createMany","set","disconnect","delete","connect","updateMany","deleteMany","increment","decrement","multiply","divide"]'),
  graph: "ggZxwAETBAAAgwMAIAgAAPcCACAMAACFAwAgEgAAhAMAIBMAAIYDACAUAACHAwAg3QEAAIADADDeAQAAOAAQ3wEAAIADADDgAQEAAAAB5AFAANICACHlAUAA0gIAIYYCAACCA50CIo0CAQD2AgAhkgIBANECACGYAgEA9gIAIZkCAQAAAAGbAgAAgQObAiKdAiAA8gIAIQEAAAABACARAwAA-AIAIN0BAACcAwAw3gEAAAMAEN8BAACcAwAw4AEBANECACHkAUAA0gIAIeUBQADSAgAh8QEBANECACHyAQEA0QIAIfMBAQDRAgAh9AEBAPYCACH1AQEA9gIAIfYBAQD2AgAh9wFAAJ0DACH4AUAAnQMAIfkBAQD2AgAh-gEBAPYCACEIAwAA2AQAIPQBAACjAwAg9QEAAKMDACD2AQAAowMAIPcBAACjAwAg-AEAAKMDACD5AQAAowMAIPoBAACjAwAgEQMAAPgCACDdAQAAnAMAMN4BAAADABDfAQAAnAMAMOABAQAAAAHkAUAA0gIAIeUBQADSAgAh8QEBANECACHyAQEA0QIAIfMBAQDRAgAh9AEBAPYCACH1AQEA9gIAIfYBAQD2AgAh9wFAAJ0DACH4AUAAnQMAIfkBAQD2AgAh-gEBAPYCACEDAAAAAwAgAQAABAAwAgAABQAgDgkAAJYDACANAACXAwAgDgAA-AIAIN0BAACaAwAw3gEAAAcAEN8BAACaAwAw4AEBANECACHkAUAA0gIAIeUBQADSAgAh8gEBANECACGEAgEA0QIAIYYCAACbA4YCIocCAQDRAgAhiAIIAJQDACEDCQAApgUAIA0AAK4FACAOAADYBAAgDgkAAJYDACANAACXAwAgDgAA-AIAIN0BAACaAwAw3gEAAAcAEN8BAACaAwAw4AEBAAAAAeQBQADSAgAh5QFAANICACHyAQEA0QIAIYQCAQDRAgAhhgIAAJsDhgIihwIBANECACGIAggAlAMAIQMAAAAHACABAAAIADACAAAJACAKCwAAkAMAIBEAAJkDACDdAQAAmAMAMN4BAAALABDfAQAAmAMAMOABAQDRAgAhgAIBANECACGBAgEA0QIAIYICAgCNAwAhgwIIAJQDACECCwAArAUAIBEAAK8FACAKCwAAkAMAIBEAAJkDACDdAQAAmAMAMN4BAAALABDfAQAAmAMAMOABAQAAAAGAAgEA0QIAIYECAQDRAgAhggICAI0DACGDAggAlAMAIQMAAAALACABAAAMADACAAANACAUBwAAlQMAIAkAAJYDACAKAACXAwAgDAAAhQMAIBAAAIkDACDdAQAAkwMAMN4BAAAPABDfAQAAkwMAMOABAQDRAgAh5AFAANICACHlAUAA0gIAIfIBAQDRAgAhgwIIAJQDACGLAgEA0QIAIYwCAQD2AgAhjQIBAPYCACGOAiAA8gIAIY8CAQD2AgAhkAIBAPYCACGRAgEA0QIAIQkHAACtBQAgCQAApgUAIAoAAK4FACAMAACnBQAgEAAAqgUAIIwCAACjAwAgjQIAAKMDACCPAgAAowMAIJACAACjAwAgFAcAAJUDACAJAACWAwAgCgAAlwMAIAwAAIUDACAQAACJAwAg3QEAAJMDADDeAQAADwAQ3wEAAJMDADDgAQEAAAAB5AFAANICACHlAUAA0gIAIfIBAQDRAgAhgwIIAJQDACGLAgEA0QIAIYwCAQD2AgAhjQIBAPYCACGOAiAA8gIAIY8CAQD2AgAhkAIBAPYCACGRAgEA0QIAIQMAAAAPACABAAAQADACAAARACABAAAADwAgAwAAAA8AIAEAABAAMAIAABEAIAMAAAAHACABAAAIADACAAAJACABAAAADwAgAQAAAAcAIAMAAAALACABAAAMADACAAANACALAwAA-AIAIAsAAJADACDdAQAAkgMAMN4BAAAZABDfAQAAkgMAMOABAQDRAgAh5AFAANICACHzAQEA0QIAIf4BAgCNAwAh_wEBAPYCACGAAgEA0QIAIQMDAADYBAAgCwAArAUAIP8BAACjAwAgDAMAAPgCACALAACQAwAg3QEAAJIDADDeAQAAGQAQ3wEAAJIDADDgAQEAAAAB5AFAANICACHzAQEA0QIAIf4BAgCNAwAh_wEBAPYCACGAAgEA0QIAIZ8CAACRAwAgAwAAABkAIAEAABoAMAIAABsAIAoLAACQAwAgDwAAjwMAIN0BAACMAwAw3gEAAB0AEN8BAACMAwAw4AEBANECACGAAgEA0QIAIYICAgCNAwAhiQIBANECACGKAhAAjgMAIQMLAACsBQAgDwAAqwUAIIoCAACjAwAgCwsAAJADACAPAACPAwAg3QEAAIwDADDeAQAAHQAQ3wEAAIwDADDgAQEAAAABgAIBANECACGCAgIAjQMAIYkCAQDRAgAhigIQAI4DACGeAgAAiwMAIAMAAAAdACABAAAeADACAAAfACADAAAAHQAgAQAAHgAwAgAAHwAgAQAAAB0AIAEAAAALACABAAAAGQAgAQAAAB0AIAEAAAALACAOAwAA-AIAIAUAAPMCACAIAAD3AgAg3QEAAPUCADDeAQAAJwAQ3wEAAPUCADDgAQEA0QIAIeQBQADSAgAh5QFAANICACHzAQEA0QIAIYcCAQDRAgAhjAIBAPYCACGXAgEA0QIAIZgCAQDRAgAhAQAAACcAIAMAAAAZACABAAAaADACAAAbACAMAwAA-AIAIN0BAACKAwAw3gEAACoAEN8BAACKAwAw4AEBANECACHjAUAA0gIAIeQBQADSAgAh5QFAANICACHzAQEA0QIAIfsBAQDRAgAh_AEBAPYCACH9AQEA9gIAIQMDAADYBAAg_AEAAKMDACD9AQAAowMAIAwDAAD4AgAg3QEAAIoDADDeAQAAKgAQ3wEAAIoDADDgAQEAAAAB4wFAANICACHkAUAA0gIAIeUBQADSAgAh8wEBANECACH7AQEAAAAB_AEBAPYCACH9AQEA9gIAIQMAAAAqACABAAArADACAAAsACAKDQAAiQMAIA4AAPgCACDdAQAAiAMAMN4BAAAuABDfAQAAiAMAMOABAQDRAgAh5AFAANICACHlAUAA0gIAIfIBAQDRAgAh8wEBANECACECDQAAqgUAIA4AANgEACAKDQAAiQMAIA4AAPgCACDdAQAAiAMAMN4BAAAuABDfAQAAiAMAMOABAQAAAAHkAUAA0gIAIeUBQADSAgAh8gEBANECACHzAQEA0QIAIQMAAAAuACABAAAvADACAAAwACABAAAAAwAgAQAAAAcAIAEAAAAZACABAAAAKgAgAQAAAC4AIAEAAAABACATBAAAgwMAIAgAAPcCACAMAACFAwAgEgAAhAMAIBMAAIYDACAUAACHAwAg3QEAAIADADDeAQAAOAAQ3wEAAIADADDgAQEA0QIAIeQBQADSAgAh5QFAANICACGGAgAAggOdAiKNAgEA9gIAIZICAQDRAgAhmAIBAPYCACGZAgEA0QIAIZsCAACBA5sCIp0CIADyAgAhCAQAAKUFACAIAADXBAAgDAAApwUAIBIAAKYFACATAACoBQAgFAAAqQUAII0CAACjAwAgmAIAAKMDACADAAAAOAAgAQAAOQAwAgAAAQAgAwAAADgAIAEAADkAMAIAAAEAIAMAAAA4ACABAAA5ADACAAABACAQBAAAnwUAIAgAAKAFACAMAACiBQAgEgAAoQUAIBMAAKMFACAUAACkBQAg4AEBAAAAAeQBQAAAAAHlAUAAAAABhgIAAACdAgKNAgEAAAABkgIBAAAAAZgCAQAAAAGZAgEAAAABmwIAAACbAgKdAiAAAAABARoAAD0AIArgAQEAAAAB5AFAAAAAAeUBQAAAAAGGAgAAAJ0CAo0CAQAAAAGSAgEAAAABmAIBAAAAAZkCAQAAAAGbAgAAAJsCAp0CIAAAAAEBGgAAPwAwARoAAD8AMBAEAADeBAAgCAAA3wQAIAwAAOEEACASAADgBAAgEwAA4gQAIBQAAOMEACDgAQEAoQMAIeQBQACiAwAh5QFAAKIDACGGAgAA3QSdAiKNAgEApwMAIZICAQChAwAhmAIBAKcDACGZAgEAoQMAIZsCAADcBJsCIp0CIAD-AwAhAgAAAAEAIBoAAEIAIArgAQEAoQMAIeQBQACiAwAh5QFAAKIDACGGAgAA3QSdAiKNAgEApwMAIZICAQChAwAhmAIBAKcDACGZAgEAoQMAIZsCAADcBJsCIp0CIAD-AwAhAgAAADgAIBoAAEQAIAIAAAA4ACAaAABEACADAAAAAQAgIQAAPQAgIgAAQgAgAQAAAAEAIAEAAAA4ACAFBgAA2QQAICcAANsEACAoAADaBAAgjQIAAKMDACCYAgAAowMAIA3dAQAA-QIAMN4BAABLABDfAQAA-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_AwAgCQAAgAQAIAoAAIEEACAMAACCBAAgEAAAgwQAIOABAQChAwAh5AFAAKIDACHlAUAAogMAIfIBAQChAwAhgwIIAL8DACGLAgEAoQMAIYwCAQCnAwAhjQIBAKcDACGOAiAA_gMAIY8CAQCnAwAhkAIBAKcDACGRAgEAoQMAIQIAAAARACAaAACJAQAgDOABAQChAwAh5AFAAKIDACHlAUAAogMAIfIBAQChAwAhgwIIAL8DACGLAgEAoQMAIYwCAQCnAwAhjQIBAKcDACGOAiAA_gMAIY8CAQCnAwAhkAIBAKcDACGRAgEAoQMAIQIAAAAPACAaAACLAQAgAgAAAA8AIBoAAIsBACADAAAAEQAgIQAAhAEAICIAAIkBACABAAAAEQAgAQAAAA8AIAkGAAD5AwAgJwAA_AMAICgAAPsDACBZAAD6AwAgWgAA_QMAIIwCAACjAwAgjQIAAKMDACCPAgAAowMAIJACAACjAwAgD90BAADsAgAw3gEAAJIBABDfAQAA7AIAMOABAQDJAgAh5AFAAMoCACHlAUAAygIAIfIBAQDJAgAhgwIIAOECACGLAgEAyQIAIYwCAQDUAgAhjQIBANQCACGOAiAA7QIAIY8CAQDUAgAhkAIBANQCACGRAgEAyQIAIQMAAAAPACABAACRAQAwJgAAkgEAIAMAAAAPACABAAAQADACAAARACABAAAAMAAgAQAAADAAIAMAAAAuACABAAAvADACAAAwACADAAAALgAgAQAALwAwAgAAMAAgAwAAAC4AIAEAAC8AMAIAADAAIAcNAAD3AwAgDgAA-AMAIOABAQAAAAHkAUAAAAAB5QFAAAAAAfIBAQAAAAHzAQEAAAABARoAAJoBACAF4AEBAAAAAeQBQAAAAAHlAUAAAAAB8gEBAAAAAfMBAQAAAAEBGgAAnAEAMAEaAACcAQAwBw0AAOkDACAOAADqAwAg4AEBAKEDACHkAUAAogMAIeUBQACiAwAh8gEBAKEDACHzAQEAoQMAIQIAAAAwACAaAACfAQAgBeABAQChAwAh5AFAAKIDACHlAUAAogMAIfIBAQChAwAh8wEBAKEDACECAAAALgAgGgAAoQEAIAIAAAAuACAaAAChAQAgAwAAADAAICEAAJoBACAiAACfAQAgAQAAADAAIAEAAAAuACADBgAA5gMAICcAAOgDACAoAADnAwAgCN0BAADrAgAw3gEAAKgBABDfAQAA6wIAMOABAQDJAgAh5AFAAMoCACHlAUAAygIAIfIBAQDJAgAh8wEBAMkCACEDAAAALgAgAQAApwEAMCYAAKgBACADAAAALgAgAQAALwAwAgAAMAAgAQAAAB8AIAEAAAAfACADAAAAHQAgAQAAHgAwAgAAHwAgAwAAAB0AIAEAAB4AMAIAAB8AIAMAAAAdACABAAAeADACAAAfACAHCwAA5QMAIA8AAOQDACDgAQEAAAABgAIBAAAAAYICAgAAAAGJAgEAAAABigIQAAAAAQEaAACwAQAgBeABAQAAAAGAAgEAAAABggICAAAAAYkCAQAAAAGKAhAAAAABARoAALIBADABGgAAsgEAMAcLAADjAwAgDwAA4gMAIOABAQChAwAhgAIBAKEDACGCAgIAtQMAIYkCAQChAwAhigIQAOEDACECAAAAHwAgGgAAtQEAIAXgAQEAoQMAIYACAQChAwAhggICALUDACGJAgEAoQMAIYoCEADhAwAhAgAAAB0AIBoAALcBACACAAAAHQAgGgAAtwEAIAMAAAAfACAhAACwAQAgIgAAtQEAIAEAAAAfACABAAAAHQAgBgYAANwDACAnAADfAwAgKAAA3gMAIFkAAN0DACBaAADgAwAgigIAAKMDACAI3QEAAOcCADDeAQAAvgEAEN8BAADnAgAw4AEBAMkCACGAAgEAyQIAIYICAgDdAgAhiQIBAMkCACGKAhAA6AIAIQMAAAAdACABAAC9AQAwJgAAvgEAIAMAAAAdACABAAAeADACAAAfACABAAAACQAgAQAAAAkAIAMAAAAHACABAAAIADACAAAJACADAAAABwAgAQAACAAwAgAACQAgAwAAAAcAIAEAAAgAMAIAAAkAIAsJAADbAwAgDQAA2QMAIA4AANoDACDgAQEAAAAB5AFAAAAAAeUBQAAAAAHyAQEAAAABhAIBAAAAAYYCAAAAhgIChwIBAAAAAYgCCAAAAAEBGgAAxgEAIAjgAQEAAAAB5AFAAAAAAeUBQAAAAAHyAQEAAAABhAIBAAAAAYYCAAAAhgIChwIBAAAAAYgCCAAAAAEBGgAAyAEAMAEaAADIAQAwCwkAAMwDACANAADKAwAgDgAAywMAIOABAQChAwAh5AFAAKIDACHlAUAAogMAIfIBAQChAwAhhAIBAKEDACGGAgAAyQOGAiKHAgEAoQMAIYgCCAC_AwAhAgAAAAkAIBoAAMsBACAI4AEBAKEDACHkAUAAogMAIeUBQACiAwAh8gEBAKEDACGEAgEAoQMAIYYCAADJA4YCIocCAQChAwAhiAIIAL8DACECAAAABwAgGgAAzQEAIAIAAAAHACAaAADNAQAgAwAAAAkAICEAAMYBACAiAADLAQAgAQAAAAkAIAEAAAAHACAFBgAAxAMAICcAAMcDACAoAADGAwAgWQAAxQMAIFoAAMgDACAL3QEAAOMCADDeAQAA1AEAEN8BAADjAgAw4AEBAMkCACHkAUAAygIAIeUBQADKAgAh8gEBAMkCACGEAgEAyQIAIYYCAADkAoYCIocCAQDJAgAhiAIIAOECACEDAAAABwAgAQAA0wEAMCYAANQBACADAAAABwAgAQAACAAwAgAACQAgAQAAAA0AIAEAAAANACADAAAACwAgAQAADAAwAgAADQAgAwAAAAsAIAEAAAwAMAIAAA0AIAMAAAALACABAAAMADACAAANACAHCwAAwgMAIBEAAMMDACDgAQEAAAABgAIBAAAAAYECAQAAAAGCAgIAAAABgwIIAAAAAQEaAADcAQAgBeABAQAAAAGAAgEAAAABgQIBAAAAAYICAgAAAAGDAggAAAABARoAAN4BADABGgAA3gEAMAcLAADAAwAgEQAAwQMAIOABAQChAwAhgAIBAKEDACGBAgEAoQMAIYICAgC1AwAhgwIIAL8DACECAAAADQAgGgAA4QEAIAXgAQEAoQMAIYACAQChAwAhgQIBAKEDACGCAgIAtQMAIYMCCAC_AwAhAgAAAAsAIBoAAOMBACACAAAACwAgGgAA4wEAIAMAAAANACAhAADcAQAgIgAA4QEAIAEAAAANACABAAAACwAgBQYAALoDACAnAAC9AwAgKAAAvAMAIFkAALsDACBaAAC-AwAgCN0BAADgAgAw3gEAAOoBABDfAQAA4AIAMOABAQDJAgAhgAIBAMkCACGBAgEAyQIAIYICAgDdAgAhgwIIAOECACEDAAAACwAgAQAA6QEAMCYAAOoBACADAAAACwAgAQAADAAwAgAADQAgAQAAABsAIAEAAAAbACADAAAAGQAgAQAAGgAwAgAAGwAgAwAAABkAIAEAABoAMAIAABsAIAMAAAAZACABAAAaADACAAAbACAIAwAAuQMAIAsAALgDACDgAQEAAAAB5AFAAAAAAfMBAQAAAAH-AQIAAAAB_wEBAAAAAYACAQAAAAEBGgAA8gEAIAbgAQEAAAAB5AFAAAAAAfMBAQAAAAH-AQIAAAAB_wEBAAAAAYACAQAAAAEBGgAA9AEAMAEaAAD0AQAwCAMAALcDACALAAC2AwAg4AEBAKEDACHkAUAAogMAIfMBAQChAwAh_gECALUDACH_AQEApwMAIYACAQChAwAhAgAAABsAIBoAAPcBACAG4AEBAKEDACHkAUAAogMAIfMBAQChAwAh_gECALUDACH_AQEApwMAIYACAQChAwAhAgAAABkAIBoAAPkBACACAAAAGQAgGgAA-QEAIAMAAAAbACAhAADyAQAgIgAA9wEAIAEAAAAbACABAAAAGQAgBgYAALADACAnAACzAwAgKAAAsgMAIFkAALEDACBaAAC0AwAg_wEAAKMDACAJ3QEAANwCADDeAQAAgAIAEN8BAADcAgAw4AEBAMkCACHkAUAAygIAIfMBAQDJAgAh_gECAN0CACH_AQEA1AIAIYACAQDJAgAhAwAAABkAIAEAAP8BADAmAACAAgAgAwAAABkAIAEAABoAMAIAABsAIAEAAAAsACABAAAALAAgAwAAACoAIAEAACsAMAIAACwAIAMAAAAqACABAAArADACAAAsACADAAAAKgAgAQAAKwAwAgAALAAgCQMAAK8DACDgAQEAAAAB4wFAAAAAAeQBQAAAAAHlAUAAAAAB8wEBAAAAAfsBAQAAAAH8AQEAAAAB_QEBAAAAAQEaAACIAgAgCOABAQAAAAHjAUAAAAAB5AFAAAAAAeUBQAAAAAHzAQEAAAAB-wEBAAAAAfwBAQAAAAH9AQEAAAABARoAAIoCADABGgAAigIAMAkDAACuAwAg4AEBAKEDACHjAUAAogMAIeQBQACiAwAh5QFAAKIDACHzAQEAoQMAIfsBAQChAwAh_AEBAKcDACH9AQEApwMAIQIAAAAsACAaAACNAgAgCOABAQChAwAh4wFAAKIDACHkAUAAogMAIeUBQACiAwAh8wEBAKEDACH7AQEAoQMAIfwBAQCnAwAh_QEBAKcDACECAAAAKgAgGgAAjwIAIAIAAAAqACAaAACPAgAgAwAAACwAICEAAIgCACAiAACNAgAgAQAAACwAIAEAAAAqACAFBgAAqwMAICcAAK0DACAoAACsAwAg_AEAAKMDACD9AQAAowMAIAvdAQAA2wIAMN4BAACWAgAQ3wEAANsCADDgAQEAyQIAIeMBQADKAgAh5AFAAMoCACHlAUAAygIAIfMBAQDJAgAh-wEBAMkCACH8AQEA1AIAIf0BAQDUAgAhAwAAACoAIAEAAJUCADAmAACWAgAgAwAAACoAIAEAACsAMAIAACwAIAEAAAAFACABAAAABQAgAwAAAAMAIAEAAAQAMAIAAAUAIAMAAAADACABAAAEADACAAAFACADAAAAAwAgAQAABAAwAgAABQAgDgMAAKoDACDgAQEAAAAB5AFAAAAAAeUBQAAAAAHxAQEAAAAB8gEBAAAAAfMBAQAAAAH0AQEAAAAB9QEBAAAAAfYBAQAAAAH3AUAAAAAB-AFAAAAAAfkBAQAAAAH6AQEAAAABARoAAJ4CACAN4AEBAAAAAeQBQAAAAAHlAUAAAAAB8QEBAAAAAfIBAQAAAAHzAQEAAAAB9AEBAAAAAfUBAQAAAAH2AQEAAAAB9wFAAAAAAfgBQAAAAAH5AQEAAAAB-gEBAAAAAQEaAACgAgAwARoAAKACADAOAwAAqQMAIOABAQChAwAh5AFAAKIDACHlAUAAogMAIfEBAQChAwAh8gEBAKEDACHzAQEAoQMAIfQBAQCnAwAh9QEBAKcDACH2AQEApwMAIfcBQACoAwAh-AFAAKgDACH5AQEApwMAIfoBAQCnAwAhAgAAAAUAIBoAAKMCACAN4AEBAKEDACHkAUAAogMAIeUBQACiAwAh8QEBAKEDACHyAQEAoQMAIfMBAQChAwAh9AEBAKcDACH1AQEApwMAIfYBAQCnAwAh9wFAAKgDACH4AUAAqAMAIfkBAQCnAwAh-gEBAKcDACECAAAAAwAgGgAApQIAIAIAAAADACAaAAClAgAgAwAAAAUAICEAAJ4CACAiAACjAgAgAQAAAAUAIAEAAAADACAKBgAApAMAICcAAKYDACAoAAClAwAg9AEAAKMDACD1AQAAowMAIPYBAACjAwAg9wEAAKMDACD4AQAAowMAIPkBAACjAwAg-gEAAKMDACAQ3QEAANMCADDeAQAArAIAEN8BAADTAgAw4AEBAMkCACHkAUAAygIAIeUBQADKAgAh8QEBAMkCACHyAQEAyQIAIfMBAQDJAgAh9AEBANQCACH1AQEA1AIAIfYBAQDUAgAh9wFAANUCACH4AUAA1QIAIfkBAQDUAgAh-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_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-gKbAiKdAiAA7QIAIQcGAADMAgAgJwAA_wIAICgAAP8CACDmAQAAAJsCAucBAAAAmwII6AEAAACbAgjtAQAA_gKbAiIHBgAAzAIAICcAAP0CACAoAAD9AgAg5gEAAACdAgLnAQAAAJ0CCOgBAAAAnQII7QEAAPwCnQIiBwYAAMwCACAnAAD9AgAgKAAA_QIAIOYBAAAAnQIC5wEAAACdAgjoAQAAAJ0CCO0BAAD8Ap0CIgTmAQAAAJ0CAucBAAAAnQII6AEAAACdAgjtAQAA_QKdAiIHBgAAzAIAICcAAP8CACAoAAD_AgAg5gEAAACbAgLnAQAAAJsCCOgBAAAAmwII7QEAAP4CmwIiBOYBAAAAmwIC5wEAAACbAgjoAQAAAJsCCO0BAAD_ApsCIhMEAACDAwAgCAAA9wIAIAwAAIUDACASAACEAwAgEwAAhgMAIBQAAIcDACDdAQAAgAMAMN4BAAA4ABDfAQAAgAMAMOABAQDRAgAh5AFAANICACHlAUAA0gIAIYYCAACCA50CIo0CAQD2AgAhkgIBANECACGYAgEA9gIAIZkCAQDRAgAhmwIAAIEDmwIinQIgAPICACEE5gEAAACbAgLnAQAAAJsCCOgBAAAAmwII7QEAAP8CmwIiBOYBAAAAnQIC5wEAAACdAgjoAQAAAJ0CCO0BAAD9Ap0CIgOUAgAAAwAglQIAAAMAIJYCAAADACAQAwAA-AIAIAUAAPMCACAIAAD3AgAg3QEAAPUCADDeAQAAJwAQ3wEAAPUCADDgAQEA0QIAIeQBQADSAgAh5QFAANICACHzAQEA0QIAIYcCAQDRAgAhjAIBAPYCACGXAgEA0QIAIZgCAQDRAgAhoAIAACcAIKECAAAnACADlAIAABkAIJUCAAAZACCWAgAAGQAgA5QCAAAqACCVAgAAKgAglgIAACoAIAOUAgAALgAglQIAAC4AIJYCAAAuACAKDQAAiQMAIA4AAPgCACDdAQAAiAMAMN4BAAAuABDfAQAAiAMAMOABAQDRAgAh5AFAANICACHlAUAA0gIAIfIBAQDRAgAh8wEBANECACEDlAIAAB0AIJUCAAAdACCWAgAAHQAgDAMAAPgCACDdAQAAigMAMN4BAAAqABDfAQAAigMAMOABAQDRAgAh4wFAANICACHkAUAA0gIAIeUBQADSAgAh8wEBANECACH7AQEA0QIAIfwBAQD2AgAh_QEBAPYCACECgAIBAAAAAYkCAQAAAAEKCwAAkAMAIA8AAI8DACDdAQAAjAMAMN4BAAAdABDfAQAAjAMAMOABAQDRAgAhgAIBANECACGCAgIAjQMAIYkCAQDRAgAhigIQAI4DACEI5gECAAAAAecBAgAAAAToAQIAAAAE6QECAAAAAeoBAgAAAAHrAQIAAAAB7AECAAAAAe0BAgDMAgAhCOYBEAAAAAHnARAAAAAF6AEQAAAABekBEAAAAAHqARAAAAAB6wEQAAAAAewBEAAAAAHtARAA6gIAIQwNAACJAwAgDgAA-AIAIN0BAACIAwAw3gEAAC4AEN8BAACIAwAw4AEBANECACHkAUAA0gIAIeUBQADSAgAh8gEBANECACHzAQEA0QIAIaACAAAuACChAgAALgAgFgcAAJUDACAJAACWAwAgCgAAlwMAIAwAAIUDACAQAACJAwAg3QEAAJMDADDeAQAADwAQ3wEAAJMDADDgAQEA0QIAIeQBQADSAgAh5QFAANICACHyAQEA0QIAIYMCCACUAwAhiwIBANECACGMAgEA9gIAIY0CAQD2AgAhjgIgAPICACGPAgEA9gIAIZACAQD2AgAhkQIBANECACGgAgAADwAgoQIAAA8AIALzAQEAAAABgAIBAAAAAQsDAAD4AgAgCwAAkAMAIN0BAACSAwAw3gEAABkAEN8BAACSAwAw4AEBANECACHkAUAA0gIAIfMBAQDRAgAh_gECAI0DACH_AQEA9gIAIYACAQDRAgAhFAcAAJUDACAJAACWAwAgCgAAlwMAIAwAAIUDACAQAACJAwAg3QEAAJMDADDeAQAADwAQ3wEAAJMDADDgAQEA0QIAIeQBQADSAgAh5QFAANICACHyAQEA0QIAIYMCCACUAwAhiwIBANECACGMAgEA9gIAIY0CAQD2AgAhjgIgAPICACGPAgEA9gIAIZACAQD2AgAhkQIBANECACEI5gEIAAAAAecBCAAAAAToAQgAAAAE6QEIAAAAAeoBCAAAAAHrAQgAAAAB7AEIAAAAAe0BCADfAgAhCgUAAPMCACDdAQAA8QIAMN4BAABpABDfAQAA8QIAMOABAQDRAgAh5AFAANICACGSAgEA0QIAIZMCIADyAgAhoAIAAGkAIKECAABpACAQAwAA-AIAIAUAAPMCACAIAAD3AgAg3QEAAPUCADDeAQAAJwAQ3wEAAPUCADDgAQEA0QIAIeQBQADSAgAh5QFAANICACHzAQEA0QIAIYcCAQDRAgAhjAIBAPYCACGXAgEA0QIAIZgCAQDRAgAhoAIAACcAIKECAAAnACADlAIAAAsAIJUCAAALACCWAgAACwAgCgsAAJADACARAACZAwAg3QEAAJgDADDeAQAACwAQ3wEAAJgDADDgAQEA0QIAIYACAQDRAgAhgQIBANECACGCAgIAjQMAIYMCCACUAwAhEAkAAJYDACANAACXAwAgDgAA-AIAIN0BAACaAwAw3gEAAAcAEN8BAACaAwAw4AEBANECACHkAUAA0gIAIeUBQADSAgAh8gEBANECACGEAgEA0QIAIYYCAACbA4YCIocCAQDRAgAhiAIIAJQDACGgAgAABwAgoQIAAAcAIA4JAACWAwAgDQAAlwMAIA4AAPgCACDdAQAAmgMAMN4BAAAHABDfAQAAmgMAMOABAQDRAgAh5AFAANICACHlAUAA0gIAIfIBAQDRAgAhhAIBANECACGGAgAAmwOGAiKHAgEA0QIAIYgCCACUAwAhBOYBAAAAhgIC5wEAAACGAgjoAQAAAIYCCO0BAADmAoYCIhEDAAD4AgAg3QEAAJwDADDeAQAAAwAQ3wEAAJwDADDgAQEA0QIAIeQBQADSAgAh5QFAANICACHxAQEA0QIAIfIBAQDRAgAh8wEBANECACH0AQEA9gIAIfUBAQD2AgAh9gEBAPYCACH3AUAAnQMAIfgBQACdAwAh-QEBAPYCACH6AQEA9gIAIQjmAUAAAAAB5wFAAAAABegBQAAAAAXpAUAAAAAB6gFAAAAAAesBQAAAAAHsAUAAAAAB7QFAANgCACEAAAABpQIBAAAAAQGlAkAAAAABAAAAAAGlAgEAAAABAaUCQAAAAAEFIQAA_gUAICIAAIEGACCiAgAA_wUAIKMCAACABgAgqAIAAAEAIAMhAAD-BQAgogIAAP8FACCoAgAAAQAgAAAABSEAAPkFACAiAAD8BQAgogIAAPoFACCjAgAA-wUAIKgCAAABACADIQAA-QUAIKICAAD6BQAgqAIAAAEAIAAAAAAABaUCAgAAAAGrAgIAAAABrAICAAAAAa0CAgAAAAGuAgIAAAABBSEAAPEFACAiAAD3BQAgogIAAPIFACCjAgAA9gUAIKgCAAARACAFIQAA7wUAICIAAPQFACCiAgAA8AUAIKMCAADzBQAgqAIAAAEAIAMhAADxBQAgogIAAPIFACCoAgAAEQAgAyEAAO8FACCiAgAA8AUAIKgCAAABACAAAAAAAAWlAggAAAABqwIIAAAAAawCCAAAAAGtAggAAAABrgIIAAAAAQUhAADnBQAgIgAA7QUAIKICAADoBQAgowIAAOwFACCoAgAAEQAgBSEAAOUFACAiAADqBQAgogIAAOYFACCjAgAA6QUAIKgCAAAJACADIQAA5wUAIKICAADoBQAgqAIAABEAIAMhAADlBQAgogIAAOYFACCoAgAACQAgAAAAAAABpQIAAACGAgILIQAAzQMAMCIAANIDADCiAgAAzgMAMKMCAADPAwAwpAIAANADACClAgAA0QMAMKYCAADRAwAwpwIAANEDADCoAgAA0QMAMKkCAADTAwAwqgIAANQDADAFIQAA3AUAICIAAOMFACCiAgAA3QUAIKMCAADiBQAgqAIAAAEAIAUhAADaBQAgIgAA4AUAIKICAADbBQAgowIAAN8FACCoAgAATgAgBQsAAMIDACDgAQEAAAABgAIBAAAAAYICAgAAAAGDAggAAAABAgAAAA0AICEAANgDACADAAAADQAgIQAA2AMAICIAANcDACABGgAA3gUAMAoLAACQAwAgEQAAmQMAIN0BAACYAwAw3gEAAAsAEN8BAACYAwAw4AEBAAAAAYACAQDRAgAhgQIBANECACGCAgIAjQMAIYMCCACUAwAhAgAAAA0AIBoAANcDACACAAAA1QMAIBoAANYDACAI3QEAANQDADDeAQAA1QMAEN8BAADUAwAw4AEBANECACGAAgEA0QIAIYECAQDRAgAhggICAI0DACGDAggAlAMAIQjdAQAA1AMAMN4BAADVAwAQ3wEAANQDADDgAQEA0QIAIYACAQDRAgAhgQIBANECACGCAgIAjQMAIYMCCACUAwAhBOABAQChAwAhgAIBAKEDACGCAgIAtQMAIYMCCAC_AwAhBQsAAMADACDgAQEAoQMAIYACAQChAwAhggICALUDACGDAggAvwMAIQULAADCAwAg4AEBAAAAAYACAQAAAAGCAgIAAAABgwIIAAAAAQQhAADNAwAwogIAAM4DADCkAgAA0AMAIKgCAADRAwAwAyEAANwFACCiAgAA3QUAIKgCAAABACADIQAA2gUAIKICAADbBQAgqAIAAE4AIAAAAAAABaUCEAAAAAGrAhAAAAABrAIQAAAAAa0CEAAAAAGuAhAAAAABBSEAANIFACAiAADYBQAgogIAANMFACCjAgAA1wUAIKgCAAAwACAFIQAA0AUAICIAANUFACCiAgAA0QUAIKMCAADUBQAgqAIAABEAIAMhAADSBQAgogIAANMFACCoAgAAMAAgAyEAANAFACCiAgAA0QUAIKgCAAARACAAAAALIQAA6wMAMCIAAPADADCiAgAA7AMAMKMCAADtAwAwpAIAAO4DACClAgAA7wMAMKYCAADvAwAwpwIAAO8DADCoAgAA7wMAMKkCAADxAwAwqgIAAPIDADAFIQAAygUAICIAAM4FACCiAgAAywUAIKMCAADNBQAgqAIAAAEAIAULAADlAwAg4AEBAAAAAYACAQAAAAGCAgIAAAABigIQAAAAAQIAAAAfACAhAAD2AwAgAwAAAB8AICEAAPYDACAiAAD1AwAgARoAAMwFADALCwAAkAMAIA8AAI8DACDdAQAAjAMAMN4BAAAdABDfAQAAjAMAMOABAQAAAAGAAgEA0QIAIYICAgCNAwAhiQIBANECACGKAhAAjgMAIZ4CAACLAwAgAgAAAB8AIBoAAPUDACACAAAA8wMAIBoAAPQDACAI3QEAAPIDADDeAQAA8wMAEN8BAADyAwAw4AEBANECACGAAgEA0QIAIYICAgCNAwAhiQIBANECACGKAhAAjgMAIQjdAQAA8gMAMN4BAADzAwAQ3wEAAPIDADDgAQEA0QIAIYACAQDRAgAhggICAI0DACGJAgEA0QIAIYoCEACOAwAhBOABAQChAwAhgAIBAKEDACGCAgIAtQMAIYoCEADhAwAhBQsAAOMDACDgAQEAoQMAIYACAQChAwAhggICALUDACGKAhAA4QMAIQULAADlAwAg4AEBAAAAAYACAQAAAAGCAgIAAAABigIQAAAAAQQhAADrAwAwogIAAOwDADCkAgAA7gMAIKgCAADvAwAwAyEAAMoFACCiAgAAywUAIKgCAAABACAAAAAAAAGlAiAAAAABBSEAAL8FACAiAADIBQAgogIAAMAFACCjAgAAxwUAIKgCAABmACAFIQAAvQUAICIAAMUFACCiAgAAvgUAIKMCAADEBQAgqAIAAE4AIAshAACZBAAwIgAAnQQAMKICAACaBAAwowIAAJsEADCkAgAAnAQAIKUCAADRAwAwpgIAANEDADCnAgAA0QMAMKgCAADRAwAwqQIAAJ4EADCqAgAA1AMAMAshAACNBAAwIgAAkgQAMKICAACOBAAwowIAAI8EADCkAgAAkAQAIKUCAACRBAAwpgIAAJEEADCnAgAAkQQAMKgCAACRBAAwqQIAAJMEADCqAgAAlAQAMAshAACEBAAwIgAAiAQAMKICAACFBAAwowIAAIYEADCkAgAAhwQAIKUCAADvAwAwpgIAAO8DADCnAgAA7wMAMKgCAADvAwAwqQIAAIkEADCqAgAA8gMAMAUPAADkAwAg4AEBAAAAAYICAgAAAAGJAgEAAAABigIQAAAAAQIAAAAfACAhAACMBAAgAwAAAB8AICEAAIwEACAiAACLBAAgARoAAMMFADACAAAAHwAgGgAAiwQAIAIAAADzAwAgGgAAigQAIATgAQEAoQMAIYICAgC1AwAhiQIBAKEDACGKAhAA4QMAIQUPAADiAwAg4AEBAKEDACGCAgIAtQMAIYkCAQChAwAhigIQAOEDACEFDwAA5AMAIOABAQAAAAGCAgIAAAABiQIBAAAAAYoCEAAAAAEGAwAAuQMAIOABAQAAAAHkAUAAAAAB8wEBAAAAAf4BAgAAAAH_AQEAAAABAgAAABsAICEAAJgEACADAAAAGwAgIQAAmAQAICIAAJcEACABGgAAwgUAMAwDAAD4AgAgCwAAkAMAIN0BAACSAwAw3gEAABkAEN8BAACSAwAw4AEBAAAAAeQBQADSAgAh8wEBANECACH-AQIAjQMAIf8BAQD2AgAhgAIBANECACGfAgAAkQMAIAIAAAAbACAaAACXBAAgAgAAAJUEACAaAACWBAAgCd0BAACUBAAw3gEAAJUEABDfAQAAlAQAMOABAQDRAgAh5AFAANICACHzAQEA0QIAIf4BAgCNAwAh_wEBAPYCACGAAgEA0QIAIQndAQAAlAQAMN4BAACVBAAQ3wEAAJQEADDgAQEA0QIAIeQBQADSAgAh8wEBANECACH-AQIAjQMAIf8BAQD2AgAhgAIBANECACEF4AEBAKEDACHkAUAAogMAIfMBAQChAwAh_gECALUDACH_AQEApwMAIQYDAAC3AwAg4AEBAKEDACHkAUAAogMAIfMBAQChAwAh_gECALUDACH_AQEApwMAIQYDAAC5AwAg4AEBAAAAAeQBQAAAAAHzAQEAAAAB_gECAAAAAf8BAQAAAAEFEQAAwwMAIOABAQAAAAGBAgEAAAABggICAAAAAYMCCAAAAAECAAAADQAgIQAAoQQAIAMAAAANACAhAAChBAAgIgAAoAQAIAEaAADBBQAwAgAAAA0AIBoAAKAEACACAAAA1QMAIBoAAJ8EACAE4AEBAKEDACGBAgEAoQMAIYICAgC1AwAhgwIIAL8DACEFEQAAwQMAIOABAQChAwAhgQIBAKEDACGCAgIAtQMAIYMCCAC_AwAhBREAAMMDACDgAQEAAAABgQIBAAAAAYICAgAAAAGDAggAAAABAyEAAL8FACCiAgAAwAUAIKgCAABmACADIQAAvQUAIKICAAC-BQAgqAIAAE4AIAQhAACZBAAwogIAAJoEADCkAgAAnAQAIKgCAADRAwAwBCEAAI0EADCiAgAAjgQAMKQCAACQBAAgqAIAAJEEADAEIQAAhAQAMKICAACFBAAwpAIAAIcEACCoAgAA7wMAMAAAAAshAACrBAAwIgAAsAQAMKICAACsBAAwowIAAK0EADCkAgAArgQAIKUCAACvBAAwpgIAAK8EADCnAgAArwQAMKgCAACvBAAwqQIAALEEADCqAgAAsgQAMA8JAACjBAAgCgAApAQAIAwAAKUEACAQAACmBAAg4AEBAAAAAeQBQAAAAAHlAUAAAAAB8gEBAAAAAYMCCAAAAAGLAgEAAAABjAIBAAAAAY0CAQAAAAGOAiAAAAABjwIBAAAAAZACAQAAAAECAAAAEQAgIQAAtgQAIAMAAAARACAhAAC2BAAgIgAAtQQAIAEaAAC8BQAwFAcAAJUDACAJAACWAwAgCgAAlwMAIAwAAIUDACAQAACJAwAg3QEAAJMDADDeAQAADwAQ3wEAAJMDADDgAQEAAAAB5AFAANICACHlAUAA0gIAIfIBAQDRAgAhgwIIAJQDACGLAgEA0QIAIYwCAQD2AgAhjQIBAPYCACGOAiAA8gIAIY8CAQD2AgAhkAIBAPYCACGRAgEA0QIAIQIAAAARACAaAAC1BAAgAgAAALMEACAaAAC0BAAgD90BAACyBAAw3gEAALMEABDfAQAAsgQAMOABAQDRAgAh5AFAANICACHlAUAA0gIAIfIBAQDRAgAhgwIIAJQDACGLAgEA0QIAIYwCAQD2AgAhjQIBAPYCACGOAiAA8gIAIY8CAQD2AgAhkAIBAPYCACGRAgEA0QIAIQ_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_gMAIY8CAQCnAwAhkAIBAKcDACGRAgEAoQMAIQ8HAAD_AwAgCgAAgQQAIAwAAIIEACAQAACDBAAg4AEBAKEDACHkAUAAogMAIeUBQACiAwAhgwIIAL8DACGLAgEAoQMAIYwCAQCnAwAhjQIBAKcDACGOAiAA_gMAIY8CAQCnAwAhkAIBAKcDACGRAgEAoQMAIQ8HAACiBAAgCgAApAQAIAwAAKUEACAQAACmBAAg4AEBAAAAAeQBQAAAAAHlAUAAAAABgwIIAAAAAYsCAQAAAAGMAgEAAAABjQIBAAAAAY4CIAAAAAGPAgEAAAABkAIBAAAAAZECAQAAAAEEIQAAywQAMKICAADMBAAwpAIAAM4EACCoAgAArwQAMAQhAAC_BAAwogIAAMAEADCkAgAAwgQAIKgCAADDBAAwAyEAALUFACCiAgAAtgUAIKgCAAABACAACAQAAKUFACAIAADXBAAgDAAApwUAIBIAAKYFACATAACoBQAgFAAAqQUAII0CAACjAwAgmAIAAKMDACAAAAABpQIAAACbAgIBpQIAAACdAgILIQAAkwUAMCIAAJgFADCiAgAAlAUAMKMCAACVBQAwpAIAAJYFACClAgAAlwUAMKYCAACXBQAwpwIAAJcFADCoAgAAlwUAMKkCAACZBQAwqgIAAJoFADALIQAAigUAMCIAAI4FADCiAgAAiwUAMKMCAACMBQAwpAIAAI0FACClAgAAwwQAMKYCAADDBAAwpwIAAMMEADCoAgAAwwQAMKkCAACPBQAwqgIAAMYEADAHIQAAhQUAICIAAIgFACCiAgAAhgUAIKMCAACHBQAgpgIAACcAIKcCAAAnACCoAgAATgAgCyEAAPwEADAiAACABQAwogIAAP0EADCjAgAA_gQAMKQCAAD_BAAgpQIAAJEEADCmAgAAkQQAMKcCAACRBAAwqAIAAJEEADCpAgAAgQUAMKoCAACUBAAwCyEAAPAEADAiAAD1BAAwogIAAPEEADCjAgAA8gQAMKQCAADzBAAgpQIAAPQEADCmAgAA9AQAMKcCAAD0BAAwqAIAAPQEADCpAgAA9gQAMKoCAAD3BAAwCyEAAOQEADAiAADpBAAwogIAAOUEADCjAgAA5gQAMKQCAADnBAAgpQIAAOgEADCmAgAA6AQAMKcCAADoBAAwqAIAAOgEADCpAgAA6gQAMKoCAADrBAAwBQ0AAPcDACDgAQEAAAAB5AFAAAAAAeUBQAAAAAHyAQEAAAABAgAAADAAICEAAO8EACADAAAAMAAgIQAA7wQAICIAAO4EACABGgAAtAUAMAoNAACJAwAgDgAA-AIAIN0BAACIAwAw3gEAAC4AEN8BAACIAwAw4AEBAAAAAeQBQADSAgAh5QFAANICACHyAQEA0QIAIfMBAQDRAgAhAgAAADAAIBoAAO4EACACAAAA7AQAIBoAAO0EACAI3QEAAOsEADDeAQAA7AQAEN8BAADrBAAw4AEBANECACHkAUAA0gIAIeUBQADSAgAh8gEBANECACHzAQEA0QIAIQjdAQAA6wQAMN4BAADsBAAQ3wEAAOsEADDgAQEA0QIAIeQBQADSAgAh5QFAANICACHyAQEA0QIAIfMBAQDRAgAhBOABAQChAwAh5AFAAKIDACHlAUAAogMAIfIBAQChAwAhBQ0AAOkDACDgAQEAoQMAIeQBQACiAwAh5QFAAKIDACHyAQEAoQMAIQUNAAD3AwAg4AEBAAAAAeQBQAAAAAHlAUAAAAAB8gEBAAAAAQfgAQEAAAAB4wFAAAAAAeQBQAAAAAHlAUAAAAAB-wEBAAAAAfwBAQAAAAH9AQEAAAABAgAAACwAICEAAPsEACADAAAALAAgIQAA-wQAICIAAPoEACABGgAAswUAMAwDAAD4AgAg3QEAAIoDADDeAQAAKgAQ3wEAAIoDADDgAQEAAAAB4wFAANICACHkAUAA0gIAIeUBQADSAgAh8wEBANECACH7AQEAAAAB_AEBAPYCACH9AQEA9gIAIQIAAAAsACAaAAD6BAAgAgAAAPgEACAaAAD5BAAgC90BAAD3BAAw3gEAAPgEABDfAQAA9wQAMOABAQDRAgAh4wFAANICACHkAUAA0gIAIeUBQADSAgAh8wEBANECACH7AQEA0QIAIfwBAQD2AgAh_QEBAPYCACEL3QEAAPcEADDeAQAA-AQAEN8BAAD3BAAw4AEBANECACHjAUAA0gIAIeQBQADSAgAh5QFAANICACHzAQEA0QIAIfsBAQDRAgAh_AEBAPYCACH9AQEA9gIAIQfgAQEAoQMAIeMBQACiAwAh5AFAAKIDACHlAUAAogMAIfsBAQChAwAh_AEBAKcDACH9AQEApwMAIQfgAQEAoQMAIeMBQACiAwAh5AFAAKIDACHlAUAAogMAIfsBAQChAwAh_AEBAKcDACH9AQEApwMAIQfgAQEAAAAB4wFAAAAAAeQBQAAAAAHlAUAAAAAB-wEBAAAAAfwBAQAAAAH9AQEAAAABBgsAALgDACDgAQEAAAAB5AFAAAAAAf4BAgAAAAH_AQEAAAABgAIBAAAAAQIAAAAbACAhAACEBQAgAwAAABsAICEAAIQFACAiAACDBQAgARoAALIFADACAAAAGwAgGgAAgwUAIAIAAACVBAAgGgAAggUAIAXgAQEAoQMAIeQBQACiAwAh_gECALUDACH_AQEApwMAIYACAQChAwAhBgsAALYDACDgAQEAoQMAIeQBQACiAwAh_gECALUDACH_AQEApwMAIYACAQChAwAhBgsAALgDACDgAQEAAAAB5AFAAAAAAf4BAgAAAAH_AQEAAAABgAIBAAAAAQkFAADUBAAgCAAA1QQAIOABAQAAAAHkAUAAAAAB5QFAAAAAAYcCAQAAAAGMAgEAAAABlwIBAAAAAZgCAQAAAAECAAAATgAgIQAAhQUAIAMAAAAnACAhAACFBQAgIgAAiQUAIAsAAAAnACAFAAC8BAAgCAAAvQQAIBoAAIkFACDgAQEAoQMAIeQBQACiAwAh5QFAAKIDACGHAgEAoQMAIYwCAQCnAwAhlwIBAKEDACGYAgEAoQMAIQkFAAC8BAAgCAAAvQQAIOABAQChAwAh5AFAAKIDACHlAUAAogMAIYcCAQChAwAhjAIBAKcDACGXAgEAoQMAIZgCAQChAwAhCQkAANsDACANAADZAwAg4AEBAAAAAeQBQAAAAAHlAUAAAAAB8gEBAAAAAYYCAAAAhgIChwIBAAAAAYgCCAAAAAECAAAACQAgIQAAkgUAIAMAAAAJACAhAACSBQAgIgAAkQUAIAEaAACxBQAwAgAAAAkAIBoAAJEFACACAAAAxwQAIBoAAJAFACAH4AEBAKEDACHkAUAAogMAIeUBQACiAwAh8gEBAKEDACGGAgAAyQOGAiKHAgEAoQMAIYgCCAC_AwAhCQkAAMwDACANAADKAwAg4AEBAKEDACHkAUAAogMAIeUBQACiAwAh8gEBAKEDACGGAgAAyQOGAiKHAgEAoQMAIYgCCAC_AwAhCQkAANsDACANAADZAwAg4AEBAAAAAeQBQAAAAAHlAUAAAAAB8gEBAAAAAYYCAAAAhgIChwIBAAAAAYgCCAAAAAEM4AEBAAAAAeQBQAAAAAHlAUAAAAAB8QEBAAAAAfIBAQAAAAH0AQEAAAAB9QEBAAAAAfYBAQAAAAH3AUAAAAAB-AFAAAAAAfkBAQAAAAH6AQEAAAABAgAAAAUAICEAAJ4FACADAAAABQAgIQAAngUAICIAAJ0FACABGgAAsAUAMBEDAAD4AgAg3QEAAJwDADDeAQAAAwAQ3wEAAJwDADDgAQEAAAAB5AFAANICACHlAUAA0gIAIfEBAQDRAgAh8gEBANECACHzAQEA0QIAIfQBAQD2AgAh9QEBAPYCACH2AQEA9gIAIfcBQACdAwAh-AFAAJ0DACH5AQEA9gIAIfoBAQD2AgAhAgAAAAUAIBoAAJ0FACACAAAAmwUAIBoAAJwFACAQ3QEAAJoFADDeAQAAmwUAEN8BAACaBQAw4AEBANECACHkAUAA0gIAIeUBQADSAgAh8QEBANECACHyAQEA0QIAIfMBAQDRAgAh9AEBAPYCACH1AQEA9gIAIfYBAQD2AgAh9wFAAJ0DACH4AUAAnQMAIfkBAQD2AgAh-gEBAPYCACEQ3QEAAJoFADDeAQAAmwUAEN8BAACaBQAw4AEBANECACHkAUAA0gIAIeUBQADSAgAh8QEBANECACHyAQEA0QIAIfMBAQDRAgAh9AEBAPYCACH1AQEA9gIAIfYBAQD2AgAh9wFAAJ0DACH4AUAAnQMAIfkBAQD2AgAh-gEBAPYCACEM4AEBAKEDACHkAUAAogMAIeUBQACiAwAh8QEBAKEDACHyAQEAoQMAIfQBAQCnAwAh9QEBAKcDACH2AQEApwMAIfcBQACoAwAh-AFAAKgDACH5AQEApwMAIfoBAQCnAwAhDOABAQChAwAh5AFAAKIDACHlAUAAogMAIfEBAQChAwAh8gEBAKEDACH0AQEApwMAIfUBAQCnAwAh9gEBAKcDACH3AUAAqAMAIfgBQACoAwAh-QEBAKcDACH6AQEApwMAIQzgAQEAAAAB5AFAAAAAAeUBQAAAAAHxAQEAAAAB8gEBAAAAAfQBAQAAAAH1AQEAAAAB9gEBAAAAAfcBQAAAAAH4AUAAAAAB-QEBAAAAAfoBAQAAAAEEIQAAkwUAMKICAACUBQAwpAIAAJYFACCoAgAAlwUAMAQhAACKBQAwogIAAIsFADCkAgAAjQUAIKgCAADDBAAwAyEAAIUFACCiAgAAhgUAIKgCAABOACAEIQAA_AQAMKICAAD9BAAwpAIAAP8EACCoAgAAkQQAMAQhAADwBAAwogIAAPEEADCkAgAA8wQAIKgCAAD0BAAwBCEAAOQEADCiAgAA5QQAMKQCAADnBAAgqAIAAOgEADAABAMAANgEACAFAAC4BAAgCAAA1wQAIIwCAACjAwAgAAAAAAINAACqBQAgDgAA2AQAIAkHAACtBQAgCQAApgUAIAoAAK4FACAMAACnBQAgEAAAqgUAIIwCAACjAwAgjQIAAKMDACCPAgAAowMAIJACAACjAwAgAQUAALgEACAAAwkAAKYFACANAACuBQAgDgAA2AQAIAzgAQEAAAAB5AFAAAAAAeUBQAAAAAHxAQEAAAAB8gEBAAAAAfQBAQAAAAH1AQEAAAAB9gEBAAAAAfcBQAAAAAH4AUAAAAAB-QEBAAAAAfoBAQAAAAEH4AEBAAAAAeQBQAAAAAHlAUAAAAAB8gEBAAAAAYYCAAAAhgIChwIBAAAAAYgCCAAAAAEF4AEBAAAAAeQBQAAAAAH-AQIAAAAB_wEBAAAAAYACAQAAAAEH4AEBAAAAAeMBQAAAAAHkAUAAAAAB5QFAAAAAAfsBAQAAAAH8AQEAAAAB_QEBAAAAAQTgAQEAAAAB5AFAAAAAAeUBQAAAAAHyAQEAAAABDwQAAJ8FACAIAACgBQAgDAAAogUAIBMAAKMFACAUAACkBQAg4AEBAAAAAeQBQAAAAAHlAUAAAAABhgIAAACdAgKNAgEAAAABkgIBAAAAAZgCAQAAAAGZAgEAAAABmwIAAACbAgKdAiAAAAABAgAAAAEAICEAALUFACAL4AEBAAAAAeQBQAAAAAHlAUAAAAABgwIIAAAAAYsCAQAAAAGMAgEAAAABjQIBAAAAAY4CIAAAAAGPAgEAAAABkAIBAAAAAZECAQAAAAEH4AEBAAAAAeQBQAAAAAHlAUAAAAABhAIBAAAAAYYCAAAAhgIChwIBAAAAAYgCCAAAAAEDAAAAOAAgIQAAtQUAICIAALsFACARAAAAOAAgBAAA3gQAIAgAAN8EACAMAADhBAAgEwAA4gQAIBQAAOMEACAaAAC7BQAg4AEBAKEDACHkAUAAogMAIeUBQACiAwAhhgIAAN0EnQIijQIBAKcDACGSAgEAoQMAIZgCAQCnAwAhmQIBAKEDACGbAgAA3ASbAiKdAiAA_gMAIQ8EAADeBAAgCAAA3wQAIAwAAOEEACATAADiBAAgFAAA4wQAIOABAQChAwAh5AFAAKIDACHlAUAAogMAIYYCAADdBJ0CIo0CAQCnAwAhkgIBAKEDACGYAgEApwMAIZkCAQChAwAhmwIAANwEmwIinQIgAP4DACEL4AEBAAAAAeQBQAAAAAHlAUAAAAAB8gEBAAAAAYMCCAAAAAGLAgEAAAABjAIBAAAAAY0CAQAAAAGOAiAAAAABjwIBAAAAAZACAQAAAAEKAwAA1gQAIAgAANUEACDgAQEAAAAB5AFAAAAAAeUBQAAAAAHzAQEAAAABhwIBAAAAAYwCAQAAAAGXAgEAAAABmAIBAAAAAQIAAABOACAhAAC9BQAgBOABAQAAAAHkAUAAAAABkgIBAAAAAZMCIAAAAAECAAAAZgAgIQAAvwUAIATgAQEAAAABgQIBAAAAAYICAgAAAAGDAggAAAABBeABAQAAAAHkAUAAAAAB8wEBAAAAAf4BAgAAAAH_AQEAAAABBOABAQAAAAGCAgIAAAABiQIBAAAAAYoCEAAAAAEDAAAAJwAgIQAAvQUAICIAAMYFACAMAAAAJwAgAwAAvgQAIAgAAL0EACAaAADGBQAg4AEBAKEDACHkAUAAogMAIeUBQACiAwAh8wEBAKEDACGHAgEAoQMAIYwCAQCnAwAhlwIBAKEDACGYAgEAoQMAIQoDAAC-BAAgCAAAvQQAIOABAQChAwAh5AFAAKIDACHlAUAAogMAIfMBAQChAwAhhwIBAKEDACGMAgEApwMAIZcCAQChAwAhmAIBAKEDACEDAAAAaQAgIQAAvwUAICIAAMkFACAGAAAAaQAgGgAAyQUAIOABAQChAwAh5AFAAKIDACGSAgEAoQMAIZMCIAD-AwAhBOABAQChAwAh5AFAAKIDACGSAgEAoQMAIZMCIAD-AwAhDwQAAJ8FACAIAACgBQAgDAAAogUAIBIAAKEFACATAACjBQAg4AEBAAAAAeQBQAAAAAHlAUAAAAABhgIAAACdAgKNAgEAAAABkgIBAAAAAZgCAQAAAAGZAgEAAAABmwIAAACbAgKdAiAAAAABAgAAAAEAICEAAMoFACAE4AEBAAAAAYACAQAAAAGCAgIAAAABigIQAAAAAQMAAAA4ACAhAADKBQAgIgAAzwUAIBEAAAA4ACAEAADeBAAgCAAA3wQAIAwAAOEEACASAADgBAAgEwAA4gQAIBoAAM8FACDgAQEAoQMAIeQBQACiAwAh5QFAAKIDACGGAgAA3QSdAiKNAgEApwMAIZICAQChAwAhmAIBAKcDACGZAgEAoQMAIZsCAADcBJsCIp0CIAD-AwAhDwQAAN4EACAIAADfBAAgDAAA4QQAIBIAAOAEACATAADiBAAg4AEBAKEDACHkAUAAogMAIeUBQACiAwAhhgIAAN0EnQIijQIBAKcDACGSAgEAoQMAIZgCAQCnAwAhmQIBAKEDACGbAgAA3ASbAiKdAiAA_gMAIRAHAACiBAAgCQAAowQAIAoAAKQEACAMAAClBAAg4AEBAAAAAeQBQAAAAAHlAUAAAAAB8gEBAAAAAYMCCAAAAAGLAgEAAAABjAIBAAAAAY0CAQAAAAGOAiAAAAABjwIBAAAAAZACAQAAAAGRAgEAAAABAgAAABEAICEAANAFACAGDgAA-AMAIOABAQAAAAHkAUAAAAAB5QFAAAAAAfIBAQAAAAHzAQEAAAABAgAAADAAICEAANIFACADAAAADwAgIQAA0AUAICIAANYFACASAAAADwAgBwAA_wMAIAkAAIAEACAKAACBBAAgDAAAggQAIBoAANYFACDgAQEAoQMAIeQBQACiAwAh5QFAAKIDACHyAQEAoQMAIYMCCAC_AwAhiwIBAKEDACGMAgEApwMAIY0CAQCnAwAhjgIgAP4DACGPAgEApwMAIZACAQCnAwAhkQIBAKEDACEQBwAA_wMAIAkAAIAEACAKAACBBAAgDAAAggQAIOABAQChAwAh5AFAAKIDACHlAUAAogMAIfIBAQChAwAhgwIIAL8DACGLAgEAoQMAIYwCAQCnAwAhjQIBAKcDACGOAiAA_gMAIY8CAQCnAwAhkAIBAKcDACGRAgEAoQMAIQMAAAAuACAhAADSBQAgIgAA2QUAIAgAAAAuACAOAADqAwAgGgAA2QUAIOABAQChAwAh5AFAAKIDACHlAUAAogMAIfIBAQChAwAh8wEBAKEDACEGDgAA6gMAIOABAQChAwAh5AFAAKIDACHlAUAAogMAIfIBAQChAwAh8wEBAKEDACEKAwAA1gQAIAUAANQEACDgAQEAAAAB5AFAAAAAAeUBQAAAAAHzAQEAAAABhwIBAAAAAYwCAQAAAAGXAgEAAAABmAIBAAAAAQIAAABOACAhAADaBQAgDwQAAJ8FACAMAACiBQAgEgAAoQUAIBMAAKMFACAUAACkBQAg4AEBAAAAAeQBQAAAAAHlAUAAAAABhgIAAACdAgKNAgEAAAABkgIBAAAAAZgCAQAAAAGZAgEAAAABmwIAAACbAgKdAiAAAAABAgAAAAEAICEAANwFACAE4AEBAAAAAYACAQAAAAGCAgIAAAABgwIIAAAAAQMAAAAnACAhAADaBQAgIgAA4QUAIAwAAAAnACADAAC-BAAgBQAAvAQAIBoAAOEFACDgAQEAoQMAIeQBQACiAwAh5QFAAKIDACHzAQEAoQMAIYcCAQChAwAhjAIBAKcDACGXAgEAoQMAIZgCAQChAwAhCgMAAL4EACAFAAC8BAAg4AEBAKEDACHkAUAAogMAIeUBQACiAwAh8wEBAKEDACGHAgEAoQMAIYwCAQCnAwAhlwIBAKEDACGYAgEAoQMAIQMAAAA4ACAhAADcBQAgIgAA5AUAIBEAAAA4ACAEAADeBAAgDAAA4QQAIBIAAOAEACATAADiBAAgFAAA4wQAIBoAAOQFACDgAQEAoQMAIeQBQACiAwAh5QFAAKIDACGGAgAA3QSdAiKNAgEApwMAIZICAQChAwAhmAIBAKcDACGZAgEAoQMAIZsCAADcBJsCIp0CIAD-AwAhDwQAAN4EACAMAADhBAAgEgAA4AQAIBMAAOIEACAUAADjBAAg4AEBAKEDACHkAUAAogMAIeUBQACiAwAhhgIAAN0EnQIijQIBAKcDACGSAgEAoQMAIZgCAQCnAwAhmQIBAKEDACGbAgAA3ASbAiKdAiAA_gMAIQoJAADbAwAgDgAA2gMAIOABAQAAAAHkAUAAAAAB5QFAAAAAAfIBAQAAAAGEAgEAAAABhgIAAACGAgKHAgEAAAABiAIIAAAAAQIAAAAJACAhAADlBQAgEAcAAKIEACAJAACjBAAgDAAApQQAIBAAAKYEACDgAQEAAAAB5AFAAAAAAeUBQAAAAAHyAQEAAAABgwIIAAAAAYsCAQAAAAGMAgEAAAABjQIBAAAAAY4CIAAAAAGPAgEAAAABkAIBAAAAAZECAQAAAAECAAAAEQAgIQAA5wUAIAMAAAAHACAhAADlBQAgIgAA6wUAIAwAAAAHACAJAADMAwAgDgAAywMAIBoAAOsFACDgAQEAoQMAIeQBQACiAwAh5QFAAKIDACHyAQEAoQMAIYQCAQChAwAhhgIAAMkDhgIihwIBAKEDACGIAggAvwMAIQoJAADMAwAgDgAAywMAIOABAQChAwAh5AFAAKIDACHlAUAAogMAIfIBAQChAwAhhAIBAKEDACGGAgAAyQOGAiKHAgEAoQMAIYgCCAC_AwAhAwAAAA8AICEAAOcFACAiAADuBQAgEgAAAA8AIAcAAP8DACAJAACABAAgDAAAggQAIBAAAIMEACAaAADuBQAg4AEBAKEDACHkAUAAogMAIeUBQACiAwAh8gEBAKEDACGDAggAvwMAIYsCAQChAwAhjAIBAKcDACGNAgEApwMAIY4CIAD-AwAhjwIBAKcDACGQAgEApwMAIZECAQChAwAhEAcAAP8DACAJAACABAAgDAAAggQAIBAAAIMEACDgAQEAoQMAIeQBQACiAwAh5QFAAKIDACHyAQEAoQMAIYMCCAC_AwAhiwIBAKEDACGMAgEApwMAIY0CAQCnAwAhjgIgAP4DACGPAgEApwMAIZACAQCnAwAhkQIBAKEDACEPBAAAnwUAIAgAAKAFACASAAChBQAgEwAAowUAIBQAAKQFACDgAQEAAAAB5AFAAAAAAeUBQAAAAAGGAgAAAJ0CAo0CAQAAAAGSAgEAAAABmAIBAAAAAZkCAQAAAAGbAgAAAJsCAp0CIAAAAAECAAAAAQAgIQAA7wUAIBAHAACiBAAgCQAAowQAIAoAAKQEACAQAACmBAAg4AEBAAAAAeQBQAAAAAHlAUAAAAAB8gEBAAAAAYMCCAAAAAGLAgEAAAABjAIBAAAAAY0CAQAAAAGOAiAAAAABjwIBAAAAAZACAQAAAAGRAgEAAAABAgAAABEAICEAAPEFACADAAAAOAAgIQAA7wUAICIAAPUFACARAAAAOAAgBAAA3gQAIAgAAN8EACASAADgBAAgEwAA4gQAIBQAAOMEACAaAAD1BQAg4AEBAKEDACHkAUAAogMAIeUBQACiAwAhhgIAAN0EnQIijQIBAKcDACGSAgEAoQMAIZgCAQCnAwAhmQIBAKEDACGbAgAA3ASbAiKdAiAA_gMAIQ8EAADeBAAgCAAA3wQAIBIAAOAEACATAADiBAAgFAAA4wQAIOABAQChAwAh5AFAAKIDACHlAUAAogMAIYYCAADdBJ0CIo0CAQCnAwAhkgIBAKEDACGYAgEApwMAIZkCAQChAwAhmwIAANwEmwIinQIgAP4DACEDAAAADwAgIQAA8QUAICIAAPgFACASAAAADwAgBwAA_wMAIAkAAIAEACAKAACBBAAgEAAAgwQAIBoAAPgFACDgAQEAoQMAIeQBQACiAwAh5QFAAKIDACHyAQEAoQMAIYMCCAC_AwAhiwIBAKEDACGMAgEApwMAIY0CAQCnAwAhjgIgAP4DACGPAgEApwMAIZACAQCnAwAhkQIBAKEDACEQBwAA_wMAIAkAAIAEACAKAACBBAAgEAAAgwQAIOABAQChAwAh5AFAAKIDACHlAUAAogMAIfIBAQChAwAhgwIIAL8DACGLAgEAoQMAIYwCAQCnAwAhjQIBAKcDACGOAiAA_gMAIY8CAQCnAwAhkAIBAKcDACGRAgEAoQMAIQ8EAACfBQAgCAAAoAUAIAwAAKIFACASAAChBQAgFAAApAUAIOABAQAAAAHkAUAAAAAB5QFAAAAAAYYCAAAAnQICjQIBAAAAAZICAQAAAAGYAgEAAAABmQIBAAAAAZsCAAAAmwICnQIgAAAAAQIAAAABACAhAAD5BQAgAwAAADgAICEAAPkFACAiAAD9BQAgEQAAADgAIAQAAN4EACAIAADfBAAgDAAA4QQAIBIAAOAEACAUAADjBAAgGgAA_QUAIOABAQChAwAh5AFAAKIDACHlAUAAogMAIYYCAADdBJ0CIo0CAQCnAwAhkgIBAKEDACGYAgEApwMAIZkCAQChAwAhmwIAANwEmwIinQIgAP4DACEPBAAA3gQAIAgAAN8EACAMAADhBAAgEgAA4AQAIBQAAOMEACDgAQEAoQMAIeQBQACiAwAh5QFAAKIDACGGAgAA3QSdAiKNAgEApwMAIZICAQChAwAhmAIBAKcDACGZAgEAoQMAIZsCAADcBJsCIp0CIAD-AwAhDwgAAKAFACAMAACiBQAgEgAAoQUAIBMAAKMFACAUAACkBQAg4AEBAAAAAeQBQAAAAAHlAUAAAAABhgIAAACdAgKNAgEAAAABkgIBAAAAAZgCAQAAAAGZAgEAAAABmwIAAACbAgKdAiAAAAABAgAAAAEAICEAAP4FACADAAAAOAAgIQAA_gUAICIAAIIGACARAAAAOAAgCAAA3wQAIAwAAOEEACASAADgBAAgEwAA4gQAIBQAAOMEACAaAACCBgAg4AEBAKEDACHkAUAAogMAIeUBQACiAwAhhgIAAN0EnQIijQIBAKcDACGSAgEAoQMAIZgCAQCnAwAhmQIBAKEDACGbAgAA3ASbAiKdAiAA_gMAIQ8IAADfBAAgDAAA4QQAIBIAAOAEACATAADiBAAgFAAA4wQAIOABAQChAwAh5AFAAKIDACHlAUAAogMAIYYCAADdBJ0CIo0CAQCnAwAhkgIBAKEDACGYAgEApwMAIZkCAQChAwAhmwIAANwEmwIinQIgAP4DACEHBAYCBgARCAoDDCkKEigIEy0QFDEMAQMAAQQGAA8JAAgNDgQOAAECCwAFEQADBgYADgcABgkACAoYBAwcChAgCwIFEgUGAAcBBRMABAMAAQUUBQYACQgVAwIFFgAIFwACAwABCwAFAgsABQ8ADAMGAA0NIQsOAAEBDSIAAwojAAwkABAlAAENJgABAwABBQQyAAgzAAw0ABM1ABQ2AAAAAAMGABYnABcoABgAAAADBgAWJwAXKAAYAQMAAQEDAAEDBgAdJwAeKAAfAAAAAwYAHScAHigAHwAAAwYAJCcAJSgAJgAAAAMGACQnACUoACYCBwAGCQAIAgcABgkACAUGACsnAC4oAC9ZACxaAC0AAAAAAAUGACsnAC4oAC9ZACxaAC0BDgABAQ4AAQMGADQnADUoADYAAAADBgA0JwA1KAA2AgsABQ8ADAILAAUPAAwFBgA7JwA-KAA_WQA8WgA9AAAAAAAFBgA7JwA-KAA_WQA8WgA9AgkACA4AAQIJAAgOAAEFBgBEJwBHKABIWQBFWgBGAAAAAAAFBgBEJwBHKABIWQBFWgBGAgsABREAAwILAAURAAMFBgBNJwBQKABRWQBOWgBPAAAAAAAFBgBNJwBQKABRWQBOWgBPAgMAAQsABQIDAAELAAUFBgBWJwBZKABaWQBXWgBYAAAAAAAFBgBWJwBZKABaWQBXWgBYAQMAAQEDAAEDBgBfJwBgKABhAAAAAwYAXycAYCgAYQEDAAEBAwABAwYAZicAZygAaAAAAAMGAGYnAGcoAGgAAAADBgBuJwBvKABwAAAAAwYAbicAbygAcBUCARY3ARc6ARg7ARk8ARs-ARxAEh1BEx5DAR9FEiBGFCNHASRIASVJEilMFSpNGStPCCxQCC1SCC5TCC9UCDBWCDFYEjJZGjNbCDRdEjVeGzZfCDdgCDhhEjlkHDplIDtnBjxoBj1rBj5sBj9tBkBvBkFxEkJyIUN0BkR2EkV3IkZ4Bkd5Bkh6Ekl9I0p-J0t_BUyAAQVNgQEFToIBBU-DAQVQhQEFUYcBElKIAShTigEFVIwBElWNASlWjgEFV48BBViQARJbkwEqXJQBMF2VAQxelgEMX5cBDGCYAQxhmQEMYpsBDGOdARJkngExZaABDGaiARJnowEyaKQBDGmlAQxqpgESa6kBM2yqATdtqwELbqwBC2-tAQtwrgELca8BC3KxAQtzswESdLQBOHW2AQt2uAESd7kBOXi6AQt5uwELerwBEnu_ATp8wAFAfcEBA37CAQN_wwEDgAHEAQOBAcUBA4IBxwEDgwHJARKEAcoBQYUBzAEDhgHOARKHAc8BQogB0AEDiQHRAQOKAdIBEosB1QFDjAHWAUmNAdcBBI4B2AEEjwHZAQSQAdoBBJEB2wEEkgHdAQSTAd8BEpQB4AFKlQHiAQSWAeQBEpcB5QFLmAHmAQSZAecBBJoB6AESmwHrAUycAewBUp0B7QEKngHuAQqfAe8BCqAB8AEKoQHxAQqiAfMBCqMB9QESpAH2AVOlAfgBCqYB-gESpwH7AVSoAfwBCqkB_QEKqgH-ARKrAYECVawBggJbrQGDAhCuAYQCEK8BhQIQsAGGAhCxAYcCELIBiQIQswGLAhK0AYwCXLUBjgIQtgGQAhK3AZECXbgBkgIQuQGTAhC6AZQCErsBlwJevAGYAmK9AZkCAr4BmgICvwGbAgLAAZwCAsEBnQICwgGfAgLDAaECEsQBogJjxQGkAgLGAaYCEscBpwJkyAGoAgLJAakCAsoBqgISywGtAmXMAa4Cac0BsAJqzgGxAmrPAbQCatABtQJq0QG2AmrSAbgCatMBugIS1AG7AmvVAb0CatYBvwIS1wHAAmzYAcECatkBwgJq2gHDAhLbAcYCbdwBxwJx"
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
var auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  database: prismaAdapter(prisma, {
    provider: "postgresql"
  }),
  trustedOrigins: [process.env.BETTER_AUTH_ORIGINS],
  user: {
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
    requireEmailVerification: true
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      try {
        const verificationUrl = `${process.env.APP_URL}/verify-email?token=${token}`;
        const info = await transporter.sendMail({
          from: '"Food Hub" <foodhub@ph.com>',
          to: user.email,
          subject: "Please verify your email!",
          html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Email Verification</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f4f6f8;
      font-family: Arial, Helvetica, sans-serif;
    }

    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }

    .header {
      background-color: #0f172a;
      color: #ffffff;
      padding: 20px;
      text-align: center;
    }

    .header h1 {
      margin: 0;
      font-size: 22px;
    }

    .content {
      padding: 30px;
      color: #334155;
      line-height: 1.6;
    }

    .content h2 {
      margin-top: 0;
      font-size: 20px;
      color: #0f172a;
    }

    .button-wrapper {
      text-align: center;
      margin: 30px 0;
    }

    .verify-button {
      background-color: #2563eb;
      color: #ffffff !important;
      padding: 14px 28px;
      text-decoration: none;
      font-weight: bold;
      border-radius: 6px;
      display: inline-block;
    }

    .verify-button:hover {
      background-color: #1d4ed8;
    }

    .footer {
      background-color: #f1f5f9;
      padding: 20px;
      text-align: center;
      font-size: 13px;
      color: #64748b;
    }

    .link {
      word-break: break-all;
      font-size: 13px;
      color: #2563eb;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <h1>Food Hub</h1>
    </div>

    <!-- Content -->
    <div class="content">
      <h2>Verify Your Email Address</h2>
      <p>
        Hello ${user.name} <br /><br />
        Thank you for registering on <strong>Food Hub</strong>.
        Please confirm your email address to activate your account.
      </p>

      <div class="button-wrapper">
        <a href="${verificationUrl}" class="verify-button">
          Verify Email
        </a>
      </div>

      <p>
        If the button doesn\u2019t work, copy and paste the link below into your browser:
      </p>

      <p class="link">
        ${url}
      </p>

      <p>
        This verification link will expire soon for security reasons.
        If you did not create an account, you can safely ignore this email.
      </p>

      <p>
        Regards, <br />
        <strong>Prisma Blog Team</strong>
      </p>
    </div>

    <!-- Footer -->
    <div class="footer">
      \xA9 2025 Prisma Blog. All rights reserved.
    </div>
  </div>
</body>
</html>
`
        });
      } catch (err) {
        console.error(err);
        throw err;
      }
    }
  },
  //google signin(frontend baki)
  socialProviders: {
    google: {
      prompt: "select_account consent",
      accessType: "offline",
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
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
      if (!session.user.emailVerified) {
        return res.status(403).json({
          success: false,
          message: "Email verification required. Please verify your email!"
        });
      }
      const user = {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        role: session.user.role,
        emailVerified: session.user.emailVerified,
        providerProfile: void 0
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
var toggleCategory = async (id) => {
  const category = await prisma.category.findUnique({ where: { id } });
  if (!category) {
    throw new Error("Category not found");
  }
  return prisma.category.update({
    where: { id },
    data: { isActive: !category.isActive }
  });
};
var categoryService = {
  createCategory,
  getAllCategories,
  toggleCategory
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
var toggleCategory2 = async (req, res) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const result = await categoryService.toggleCategory(id);
  res.status(200).json({
    success: true,
    data: result
  });
};
var CategoryController = {
  createCategory: createCategory2,
  getAllCategories: getAllCategories2,
  toggleCategory: toggleCategory2
};

// src/modules/category/category.route.ts
var router3 = express3.Router();
router3.post(
  "/admin/categories",
  auth_default("ADMIN" /* ADMIN */),
  CategoryController.createCategory
);
router3.patch(
  "/categories/:id",
  auth_default("ADMIN" /* ADMIN */),
  CategoryController.toggleCategory
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
    const result = await orderService.createOrder({
      customerId: req.user.id,
      ...req.body
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

// src/app.ts
var app = express8();
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://assignment4-client-lilac.vercel.app"
    ],
    credentials: true
  })
);
app.options("*", cors());
app.use(express8.json());
app.use("/api/auth", toNodeHandler(auth));
app.use("/provider/meals", MealRouter);
app.use("/category", categoryRouter);
app.use("/provider", providerRouter);
app.use("/order", orderRouter);
app.use("/admin", userRouter);
app.use("/customer", cartRouter);
app.use("/customer", reviewRouter);
app.get("/", (req, res) => {
  res.send("Hello, World!");
});
var app_default = app;

// src/server.ts
var server_default = app_default;
export {
  server_default as default
};
