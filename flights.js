const https   =   require('https');
const express = require('express');
const csv =require('csvtojson');
const app = express();
const promises=[];

app.listen(5000,()=>console.log("listening on port zok om 5000"))
app.get('/api/flights', async (req,res)=>{
  let sum=[];
  let jazzres= await air_jazz();
  let moonres= await air_moon();
  let beamres= await air_beam();
  //sum = jazzres.concat(moonres);
  sum = jazzres.concat(moonres)
  res.send(sum);
  console.log(beamres);
});
async function air_jazz ()
{
  let data = '';
  https.get('https://my.api.mockaroo.com/air-jazz/flights?key=dd764f40', (resp) => {
  
  console.log('statusCode:', resp.statusCode);
  //console.log('headers:', resp.headers);
  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    JSON.parse(data).explanation;
   // console.log(data);
  });
}).on("error", (err) => {
  console.log("Error: " + err.message);
});
return new Promise((resolve,reject)=>{
  setTimeout(()=> {
    resolve(data);
  }, 3000);
});
}
async function air_moon ()
{
  let data = '';
  https.get('https://my.api.mockaroo.com/air-moon/flights?key=dd764f40', (resp) => {
  
  console.log('statusCode:', resp.statusCode);
  //console.log('headers:', resp.headers);
  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    JSON.parse(data).explanation;
    //console.log(data);
  });
}).on("error", (err) => {
  console.log("Error: " + err.message);
});
return new Promise((resolve,reject)=>{
  setTimeout(()=> {
    resolve(data);
  }, 3000);
});
}
async function air_beam ()
{
  let data = '';
  //let jsonob= [];
  https.get('https://my.api.mockaroo.com/air-beam/flights?key=dd764f40', (resp) => {
  
  console.log('statusCode:', resp.statusCode);
  //console.log('headers:', resp.headers);
  resp.on('data', (chunk) => {
    data += chunk;
  });
  resp.on('end', () => {
   const converter = csv({delimiter:','});
    converter.fromString(data).then(jsonob =>{
      console.log(jsonob);
    })
})

  }).on("error", (err) => {
  console.log("Error: " + err.message);
});

/*return new Promise((resolve,reject)=>{
  setTimeout(()=> {
    resolve(data);
  }, 3000)
});*/
}

/*
const addtolist = async (obj)=>{
  promises.push(new Promise(async(res) => {
    const converted = {
      "provider" : "AIR_BEAM",
      "price" : obj['p'],
      "departure_time":obj['departure'],
      "arrival_time":obj['arrival']
    }
    res();
  }
  ))
}*/
