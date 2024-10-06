const express = require("express")
const app = express();
const path = require("path")
const fs = require("fs")



app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs")
app.use(express.static(path.join(__dirname,"public")));



app.get("/",(req,res)=>{
    fs.readdir(`./files`,function(err,files){
        res.render("index",{files:files})   
    }) 
})


app.post("/create",(req,res)=>{
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`,req.body.details,function(err){
        res.redirect("/")
    })    
})

app.get("/edit/:filename",(req,res)=>{
    fs.readFile(`./files/${req.params.filename}`,'utf-8',function(err,fileData){
        res.render('edit',{filename:req.params.filename, filedata:fileData})
    })  
})

app.post("/update/:filename",(req,res)=>{
    fs.writeFile(`./files/${req.body.title}`,`${req.body.details}`,function(err,fileData){
        res.redirect("../../")
    })
})


app.get("/file/:filename",(req,res)=>{
    fs.readFile(`./files/${req.params.filename}`,'utf-8',function(err,fileData){
        res.render('show',{filename:req.params.filename, filedata:fileData})
    })   
})


app.get("/delete/:filename",(req,res)=>{
   fs.unlink(`./files/${req.params.filename}`,function(err){
        res.redirect("back")
   })
})  

//delete from opened 
app.get("/file/delete/:filename",(req,res)=>{
    fs.unlink(`./files/${req.params.filename}`,function(err){
         res.redirect("../../")
    })
 })  


const PORT = 3000;
app.listen(PORT,()=>{
    console.log(`Server Running on PORT ${PORT}`);
})