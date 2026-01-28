import { NextFunction, Request, Response } from "express";
import { mealService } from "./menu.services";

const createMeal = async (req: Request, res: Response) => {
    try {      
  const result = await mealService.createMeal(req.body)
  res.status(201).json(result)
        }
       catch(e){
          res.status(400).json({
             error:"post created faild",
             details:e                 
          })                    
       }
    } 



export const MealController = {
       createMeal                       
}