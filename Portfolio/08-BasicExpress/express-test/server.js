const express = require('express');
const https = require('https');
const app = express();
const FormData = require('form-data');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs")

var shopping = ["apples", "eggs", "coffee"]
var joke = "";
var checked = "";

app.route('/')
  .get(function (req, res){
  var name = "PATO";
  var students =[
    {
      "id":10,
      "name": "juan",
      "lastname": "Lopez",
      "YOB": 2001
    },
    {
      "id":23,
      "name": "Alejandro",
      "lastname": "Carrillo",
      "YOB": 2007
    },
    {
      "id":36,
      "name": "Rodrigo",
      "lastname": "Diaz",
      "YOB": 2002
    }
  ]

    
  var params = {
    name,
    lastname : "Avalos",
    shopping,
    students,
    joke, checked
  };
  
  res.render("home", params);
})

  .post(function (req, res){
  var w = req.body.weight;
  var h = req.body.height;
  res.send("YOUR BMI is " + (w / (h*h)));
});

app.post('/check', (req, res) =>{
  var url="https://api.toys/api/check_dictionary";
  var word = req.body.word;
  const form_data = new FormData();
  form_data.append("text", word);
  const options = {
    method: "POST",
    headers: form_data.getHeaders()
  };
  var sRequest = https.request(url, options ,(response) =>{
    if(response.statusCode == 200) {
      response.on("data", (data)=>{
        var jsonResp = JSON.parse(data);
        checked = jsonResp["found"] ? "True" : "False";
        res.redirect("/");
      }).on("error", (e) =>{
        console.log("Error ${e.message}");
      });
    }
  });
  form_data.pipe(sRequest);
});

app.get('/about',function(req,res){
  var students =[
    {
      "id":10,
      "name": "juan",
      "lastname": "Lopez",
      "YOB": 2001
    },
    {
      "id":23,
      "name": "Alejandro",
      "lastname": "Carrillo",
      "YOB": 2007
    },
    {
      "id":36,
      "name": "Rodrigo",
      "lastname": "Diaz",
      "YOB": 2002
    }
  ]
  res.render("about", {students});

  //res.send('My name is Pato');
});

app.post('/shop',(req,res) =>{
  var newItem = req.body.item;
  shopping.push(newItem);
  res.redirect("/");
});

app.get('/delete/:idx/country/123', (req,res) =>{
  var delIdx = req.params.idx;
  delete shopping[delIdx];
  res.redirect("/");
})

app.get('/joke', (req,res) => {
  var url ="https://v2.jokeapi.dev/joke/Any?type=single";
  https.get(url, (response) =>{
    console.log(response.statusCode);
    var responseContent = "";
    response.on("data", (data)=>{
      responseContent += data;
    }).on("end", () =>{
      var jsonResp =JSON.parse(responseContent);
      console.log(jsonResp["joke"]);
      joke = jsonResp["joke"];
      //res.write(responseContent);
      //res.send();
      res.redirect("/")
    }).on("error", (e) =>{
      res.send("Error: ${e.message}")
    });
  });
});

app.listen(3000, () => {
    console.log('Aplication listening port 3000');
});