import express from  'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import postRoutes from './routes/posts.js'
import userRoutes from './routes/users.js'
import dotenv from 'dotenv'



const App=express();

dotenv.config();
App.use(bodyParser.json({limit:"30mb",extended:true}))
App.use(bodyParser.urlencoded({limit:"30mb",extended:true}))
App.use(cors());
App.use('/posts',postRoutes)
App.use('/user',userRoutes)
App.get('/',(req,res)=>{
    res.send("hello")
})
const  COONECTION_URL=process.env.COONECTION_URL;
const PORT=process.env.PORT || 5000;

mongoose.connect(COONECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>App.listen(PORT,()=>console.log(`server runing on port:${PORT}`)))
    .catch((error)=> console.log(error.message ))

mongoose.set('useFindAndModify',false);