var projectData={};
const express = require ('express');
const app = express();
const bodyParser=require('body-parser');
const cors=require('cors');
const port=8888;
//initiating server on port 8888
app.listen(port);

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());
app.use(express.static("public"));

app.get('/',  (req,res)=>{
    res.sendFile('index.html');
    
});



app.post('/data',async(req,res,next)=>{
    projectData.temperature=req.body[0].main.temp;
    projectData.date=req.body[1];
    projectData.userResponse=req.body[2];
    console.log("data received : ", projectData.temperature, projectData.date, projectData.userResponse);
    
});

app.get('/getData',async(req,res)=>{
    res.json(projectData);
    console.log("data sent",projectData);
});