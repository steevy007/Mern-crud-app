const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors')
const morgan=require('morgan');
const PORT=process.env.PORT || 5050;
const apiFriends=require('./routes/api/friends');
require('dotenv').config();
const MONGODBURI='mongodb+srv://sanon:steeve@cluster0.npwzc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(MONGODBURI,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useFindAndModify: false 

})
.then(()=>{
    console.log("Connected to mongo database");
})
.catch((error)=>{
    console.log("not connected Error :",error);
})
const app=express();
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use('/Friend',apiFriends);
app.use('*',(req,res)=>{
    res.status(404).json("Page not Found");
})
app.listen(PORT,()=>{
    console.log(`conncted on port ${PORT} `);
})
