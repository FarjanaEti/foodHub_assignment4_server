
import { prisma } from "../../lib/prisma";

export const createOrder = async (payload:{
  customerId: string,
   providerId: string;
  address: string;
  items:{
     mealId:string;
     quantity:number;                         
  }[];                         
}
 
) => {
  const mealIds = payload.items.map(item => item.mealId);
  
  const meals=await prisma.meal.findMany({
      where: {
      id: { in: mealIds },
      available: true,
      providerId: payload.providerId,
    },                       
  })       
  
  if(meals.length !== payload.items.length){
       throw new Error("unavailable meal");                        
  }
  
  let totalAmount = 0;
  const orderItems = payload.items.map(item => {
    const meal = meals.find(m => m.id === item.mealId)!;

    const itemTotal = meal.price * item.quantity;
    totalAmount += itemTotal;

    return {
      mealId: meal.id,
      quantity: item.quantity,
      price: meal.price,
    };
  });
  const order = await prisma.order.create({
    data: {
      customerId: payload.customerId,
      providerId: payload.providerId,
      address: payload.address,
      totalAmount,
      items: {
        create: orderItems,
      },
    },
    include: {
      items: true,
    },
  });

  return order;

  
};

//get all order provider and admin
export const getAllOrder=async()=>{
   return prisma.order.findMany({
    where: { status:"PLACED" },
    orderBy: { createdAt: "asc" },
  });
}

//get order by id
const getOrderById = async (id: string) => {
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      customer:{
        select:{
          id:true,
          email:true
        }
      },
      provider:{
        select:{
          id:true,
          restaurantName:true
        }
      }
    },
  });

  if (!order) {
    throw new Error("order not found");
  }

  return order;
};
export const orderServiceProvider={
        createOrder,
        getAllOrder,
        getOrderById                      
}