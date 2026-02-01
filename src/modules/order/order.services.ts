
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

export const orderServiceProvider={
        createOrder                      
}