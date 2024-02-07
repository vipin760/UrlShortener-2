import { Schema, model } from "mongoose";
import { IUrlShort } from "../share/interface/IUrl.interface";

const urlSchema =new Schema<IUrlShort>({
    shortUrl:{type:String, require:true, unique:true},
    redirectUrl:{type:String, require:true},
    visitHistory:[{ timestamp:{type:Number}}],
},{timestamps:true})

const UrlModel = model<IUrlShort>('url',urlSchema);
export default UrlModel