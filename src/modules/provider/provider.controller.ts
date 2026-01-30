import { Request, Response } from "express";
import { providerService } from "./provider.services";

const createProvider = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
   console.log(userId)
   
    const { restaurantName, address, phone, description } = req.body;

    const result = await providerService.createProviderProfile(
      {
        restaurantName,
        address,
        phone,
        description,
      },
      userId
    );

    res.status(201).json({
      success: true,
      message: "Provider profile created successfully",
      data: result,
    });
  } catch (e: any) {
    res.status(400).json({
      success: false,
      message: e.message || "Provider profile creation failed",
    });
  }
};

export const providerController = {
  createProvider,
};
