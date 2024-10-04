import express from "express";
import path from "path";
import userModel from "./models/user";

const app = express();                //calling a express function

// setup of Ejs (url encoded)  or json setup krna takii hmara form work kre and view engine setup for ejs

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, 'public')));                    




app.get('/', (req,res)=>{
    res.render("index");                                                     // it showcase on index.ejs   means  data come from index.ejs and render it on website
})

app.get('/read', async (req,res)=>{
    let users = await userModel.find();                                              // first read the data
    res.render("read", {users});                                                         // then render the data
})


app.get('/edit/:userid', async (req,res)=>{
    let user = await userModel.findOne({_id: req.params.userid});                                              // first read the data
    res.render("edit", {user});                                                         // then render the data
})

app.post('/update/:userid', async (req,res)=>{
    let {image, name, email} = req.body;
    let user = await userModel.findOneAndUpdate({_id: req.params.userid}, {image, name, email}, {new:true});                                              //  update the user 
    res.redirect("/read");                                                         
})


app.get('/delete/:id', async (req,res)=>{                                                            // delete the id 
    let users = await userModel.findOneAndDelete({_id: req.params.id});                    
    res.redirect("/read");                           
})


app.post('/create', async (req,res)=>{                                    // create the data 
let {name, email, image} = req.body;

let createdUser = await userModel.create({
      name,
      email,
      image
});
res.redirect("/read");
})

app.listen(3000);