import { Router, Request,Response } from "express";
import asyncHandler from "express-async-handler";
import UrlModel from "../model/url.model";
import shortId from 'shortid'
const router = Router()

router.post('/',asyncHandler( async (req:Request,res:Response)=>{
try {
    const { url } = req.body
    const urlData = await UrlModel.findOne({redirectUrl:url})
    if(urlData){
        res.status(200).send({data:urlData,message:"successfully shortened url"});
    }else{
        const shortid = shortId.generate();
        const newUrlData = await UrlModel.create({
            shortUrl:shortid,
            redirectUrl:url
        })
        res.status(200).send({data:newUrlData,message:"successfully shortened url"});
    }
    
} catch (error) {
    res.status(500).send({data:"",message:"internal server down"})
}
}))

router.get('/:id',asyncHandler (async(req:Request, res:Response)=>{
    try {
        const urlData = await UrlModel.findOneAndUpdate({shortUrl:req.params.id},{$push:{
            visitHistory:{
                timestamp:Date.now()
            }
        }})
       if(urlData){
        res.status(200).send({data:urlData.redirectUrl,message:"url fetch successfully"})
       }
    } catch (error) {
        res.status(500).send({data:"",message:"internal server down"})
    }
}))

router.get('/analytics/:id',asyncHandler( async(req:Request,res:Response)=>{
    try {
        const urlData = await UrlModel.findOne({shortUrl:req.params.id})
        if(urlData){
            const urlAnalytics = {
                totalClicks:urlData.visitHistory.length,
                analytics:urlData.visitHistory
            }
            res.status(200).send({data:urlAnalytics, message:"url anyalytics created successfully"})
        }
    } catch (error) {
        res.status(500).send({data:"",message:"internal server down"})
    }
}))

export default router