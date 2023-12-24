import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const port=3000;
const app=express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",async (req,res)=>{
    try{
    const result= await axios.get("https://bank-apis.justinclicks.com/API/V1/IFSC/IFSC_CODE_OF_BANK/");
    res.render("index.ejs",{data: result.data});
    }catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
          error: error.message,
        });
      }
});

app.post("/",async(req,res)=>{
    try{
        const cod=req.body.ifsccode;
        const result=await axios.get(`https://bank-apis.justinclicks.com/API/V1/IFSC/${cod}/`);
        res.render("index.ejs",{data: result.data});
    }catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
          error: error.message,
        });
      }
})

app.listen(port,()=>{
    console.log(`server id running on port ${port}`);
});