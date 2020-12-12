
//post request function client-side
async function getData(url=''){
    let data = await fetch(url);
    let info = await data.json();
    return info;
}
//get request function server-side
async function postData(url='',data={}){
    let response = await fetch(url,{
        method:"post",
        credentials:"same-origin",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(data)
    });
    return await response.json();
}
//event listeners
document.querySelector("#generate").addEventListener('click',displayInfo);



async function displayInfo(){
    var text = document.querySelector("#zip").value;
         if (text.length==5){
            $('#zip').popover('hide');
            const time = new Date();
            const zip =document.querySelector("#zip").value;
            const date=time.toLocaleDateString();
            const apiKey = `http://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=9c234c5e422aa7acb7a512ee88b22f0e&units=metric`;
            const comment =document.querySelector("#feelings").value;
            const fetchApi = await getData(apiKey);
            postData('/data',[fetchApi,date,comment]);
            const data= await getData('/getData');
            document.querySelector("#temp p").innerHTML=   data.temperature +"°C";
            document.querySelector("#date p").innerHTML=data.date;
            document.querySelector("#content p").innerHTML=data.userResponse;
            }else{
                $('#zip').popover('show'); 
                setTimeout(()=>{$('#zip').popover('hide'); },5000);
            }
        }
