import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";



export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

    if(!token){
      return next(createError(401,"You are not authenticated "));
    }
    
    jwt.verify(token,process.env.JWT, (err, info)=>{
      if(err) return next(createError(403,"Token is not valid!"));
      req.user = info;
      next();
    })
};

export const verifyUser = (req, res, next) => {
  const token = req.cookies.access_token;

  if(!token){
    return next(createError(401,"You are not authenticated "));
  }
  
  jwt.verify(token,process.env.JWT, (err, info)=>{
    if(err) return next(createError(403,"Token is not valid!"));
    if(info.id === req.query.user_id || info.isAdmin){
      next();
    }
    else {
      res.send("You are not a user")
    }
  })

};

export const verifyAdmin = (req, res, next) => {
  const token = req.cookies.access_token;
  if(!token){
    return next(createError(401,"You are not authenticated "));
  }
  
  jwt.verify(token,process.env.JWT, (err, info)=>{
    if(err) return next(createError(403,"Token is not valid!"));
    if(info.isAdmin){
      next();
    }
    else {
      res.send("You are not an admin")
    }
  })
};