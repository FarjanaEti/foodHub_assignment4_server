import { Request, Response } from "express";
import { providerService } from "./provider.services";
import paginationSortingHelper from "../../helper/paginationSortingHelper";

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

const getAllProviders = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;
    const searchString =
      typeof search === "string" ? search : undefined;

    const { page, limit, skip, sortBy, sortOrder } =
      paginationSortingHelper(req.query);

    const result = await providerService.getAllProviders({
      search: searchString,
      page,
      limit,
      skip,
      sortBy,
      sortOrder,
    });

    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({
      error: "Failed to fetch providers",
      details: e,
    });
  }
};

//get provider by id with menu
const getProviderById=async(req:Request, res:Response)=>{
  try{
     const {providerId}=req.params;
     const result=await providerService.getProviderById(providerId as string)
     res.status(200).json(result)
  }catch(e:any){
    res.status(404).json({
      success: false,
      message: e.message || "provider not found",
    });
  }
}



export const providerController = {
  createProvider,
  getAllProviders,
  getProviderById
};
