import Hotel from "../models/Hotel.js";

export const createHotel = async (req,res,next)=> {
    const newHotel = new Hotel(req.body);
    try{
        const savedHotel = await newHotel.save()
        res.status(201).json(savedHotel);
    }catch(err){
        next(err);
    }
}


export const updateHotel = async (req,res,next)=> {
    try{
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, {$set : req.body});
        res.status(201).json(updatedHotel);
    }catch(err){
        next(err);
    }
}


export const deleteHotel = async(req,res,next)=> {
    try{
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel has been deleted.");
    }catch(err){
        next(err);
    }
}


export const getHotel = async(req,res,next)=>{
    try{
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json(hotel);
    }catch(err){
       next(err);
    }
}

export const getHotels = async(req,res,next)=>{
    const {min,max, ...others} = req.query;
    try{
        const hotels = await Hotel.find({
            ...others,
            cheapestPrice: { $gt: min | 1, $lt: max || 100000 },
          }).limit(req.query.limit);
        res.status(200).json(hotels);
    }catch(err){
        next(err);
    }
}

export const countByCity = async(req,res,next)=>{

    const cities = req.query.cities.split(",");
    try{
        const list = await Promise.all(cities.map(city=> {
            return Hotel.countDocuments({city:city});
        }))
        res.status(200).json(list);
    }catch(err){
        next(err);
    }
}


export const countByType  = async(req,res,next)=>{
    try{
    const hotelCount = await Hotel.countDocuments({type:"hotel"})   
    const apartmentCount = await Hotel.countDocuments({type:"apartments"})
    const resortsCount = await Hotel.countDocuments({type:"resorts"})
    const villaCount = await Hotel.countDocuments({type:"villa"})
    const cabinCount = await Hotel.countDocuments({type:"cabin"})        


        res.status(200).json([
            {type: "hotels", count: hotelCount},
            {type: "apartments", count: apartmentCount},
            {type:"resorts", count: resortsCount},
            {type: "villas", count: villaCount},
            {type: "cabins", count: cabinCount},
        ]);
    }catch(err){
        next(err);
    }
}