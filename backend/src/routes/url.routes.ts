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

router.get('/analytics',asyncHandler( async(req:Request,res:Response)=>{
    try {

        const urlString= req.query.id as string
        const newUrl = new URL(urlString)
        const path = newUrl.pathname.split('/');
        const shortid = path[path.length-1];
        
        const urlData = await UrlModel.findOne({shortUrl:shortid})
        if(urlData){
            const urlAnalytics = {
                totalClicks:urlData.visitHistory.length,
                analytics:urlData.visitHistory
            }
            res.status(200).send({data:urlAnalytics, message:"url anyalytics created successfully"})
        }else{
            res.status(401).send({data:"",message:"We cannot find the correspondence address you provided."})
        }
    } catch (error) {
        res.status(500).send({data:"",message:"internal server down"})
    }
}))


router.get("/un-short",asyncHandler ( async(req:Request,res:Response)=>{
    try {
        const uri = req.query.id as string
        const url = new URL(uri);
        const path = url.pathname.split('/')
        const shortId= path[path.length-1]
        const urlExist = await UrlModel.findOne({shortUrl:shortId});
        
        if(urlExist){
            console.log(urlExist.redirectUrl,"yup");
            res.status(200).send({data:urlExist.redirectUrl,message:"fetch unshorten url"})
        }else{
            res.status(401).send({data:'',message:"could not find in our collections"})
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




// router.get("/un-short",asyncHandler ( async(req:Request,res:Response)=>{
//     try {
//         console.log("working");
        
//         const url = req.query.id;
//         console.log(url);
//         const urlExist = await UrlModel.findOne({shortUrl:url});
//         console.log(urlExist);
        
//         if(urlExist){
//             res.status(200).send({data:urlExist.redirectUrl,message:"fetch unshorten url"})
//         }else{
//             res.status(401).send({data:'',message:"could not find in our collections"})
//         }
//     } catch (error) {
//         res.status(500).send({data:"",message:"internal server down"})
//     }
// }))

export default router