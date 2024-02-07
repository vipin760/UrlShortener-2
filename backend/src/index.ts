import express from 'express'
import dotenv from 'dotenv'
import { dbConnect } from './config/conf'
import cors from 'cors'
const app = express()

dotenv.config()
dbConnect()
app.use(cors({
  origin:["http://localhost:4200"]
}))

import url_routes from "../src/routes/url.routes"

app.use(express.json());

app.use('/api/url',url_routes);

app.listen(process.env.Port,()=>{
  console.log(`running port ${process.env.Port}`);
})