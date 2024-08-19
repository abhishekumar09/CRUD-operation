import express from "express";
const app = express();                //calling a express function

import path from "path";


// setup of Ejs (url encoded)  or json setup krna takii hmara form work kre and view engine setup for ejs

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, 'public')));                    




app.get('/', (req,res)=>{
    res.render("index");        // it showcase on index.ejs   means  data come from index.ejs and render it on website
})

app.get('/', (req,res)=>{
    res.render("read");        
})

app.post('/', (req,res)=>{
    
})

app.listen(3000);