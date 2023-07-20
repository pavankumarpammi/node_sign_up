const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/",function(req,res)
{
  res.sendFile(__dirname+"/pro_signup.html");
  });
  app.post("/",function(req,res)
  {
    const firstname = req.body.fname;
    const email = req.body.email;
  const  lastname =req.body.lname;
  const data ={
      members:[
        {
          email_address:email,
          status:"subscribed",
          merge_fields:{
            FNAME:firstname,
            LNAME:lastname,
          },

        }
      ]
    };
  const jsonData = JSON.stringify(data);
  const url = "https://us21.api.mailchimp.com/3.0/lists/559d48c4ed"
  const option={
    method:"POST",
    auth:"pavan:73175ea652cad9fb1e775e2f9768dc67-us21"
  }

  const request =https.request(url,option,function(response)
{

  // if(err ===0)
  // {
  //   res.sendFile(__dirname+"/success.html");
  //
  // }
  // else{
  //   res.send("Something went wrong!");
  // }
  response.on("data",function(data)
{
  console.log(JSON.parse(data));
  const con =JSON.parse(data);
   const err= con.error_count;
   if(err ===0)
   {
     res.sendFile(__dirname+"/success.html");

   }
   else{
     res.sendFile(__dirname+"/failure.html");
   }
})
})
request.write(jsonData);
request.end();

});


app.post("/failure",function(req,res){
  res.redirect("/");
})


app.listen(process.env.PORT||3000,function()
{
   console.log("server started at 3000");
});

// api key
//0541848ef095a0436708e37d6bcef89b-us21

//auidance // IDEA:
//559d48c4ed
//559d48c4ed
