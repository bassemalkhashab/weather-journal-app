var projectData={};
const express = require ('express');
const app = express();
const bodyParser=require('body-parser');
const fetch= require('node-fetch');
const cors=require('cors');
//const api = "api.openweathermap.org/data/2.5/weather?zip=94040,us&appid=9c234c5e422aa7acb7a512ee88b22f0e&units=metric"
const port=8888;
//initiating server on port 8888
app.listen(port);

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors())
app.use(express.static("public"));

app.get('/',  (req,res)=>{
    res.sendFile('index.html');
    
});

app.post('/info', async (req,res)=>{
    projectData= req.body;
    console.log("zip-code received "+projectData.zipCode);
    
});

app.get('/info',async (req,res)=>{
     console.log('sending data '+ projectData.zipCode);
    let data = await fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${projectData.zipCode},us&appid=9c234c5e422aa7acb7a512ee88b22f0e&units=metric`);
    projectData = await data.json();
    res.json(projectData);
         console.log(projectData);
});

