const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.post("/", function (req, res) {
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;





  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };




  var jsonData = JSON.stringify(data);


  const url = "https:us21.api.mailchimp.com/3.0/lists/f3e88dfc5e";
  const options = {
    method: "POST",
    auth: "aditya:dc5acad3b2ba5ae68e08600b22195430e-us21",
  };




  const request = https.request(url, options, function (response) {
   if( response.statusCode===200){
    res.sendFile(__dirname+"/success.html");
   }
   else{
    res.sendFile(__dirname+"/failure.html");
   }
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();
});

app.post("/failure",function(req,res){
    res.redirect("/")
})

app.listen(process.env.PORT||3000, function () {
  console.log("server is up");
});

// api key c5acad3b2ba5ae68e08600b22195430e-us21
// audience id f3e88dfc5e
