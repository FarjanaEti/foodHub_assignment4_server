import { Request, Response } from "express";
import { userServices } from "./user.services";

const getAllUser = async (req: Request, res: Response) => {
  try {
    const user = req.user;
  console.log(user)
    if (!user || user.role !== "ADMIN") {
      return res.status(403).json({
        success: false,
        message: "Forbidden",
      });
    }
    const result = await userServices.getAllUser()
     res.status(200).json({
    success: true,
    data: result,
  });
} catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Failed to fetch all User",
      error: error.message,
    });
  }                        
}


//update
const toggleUserStatus = async (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id)
    ? req.params.id[0]
    : req.params.id;

  const result = await userServices.toggleUserStatus(id);

  res.status(200).json({
    success: true,
    data: result,
  });
};


 


export const userController = {
getAllUser,
toggleUserStatus
}