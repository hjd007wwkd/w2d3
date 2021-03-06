var express = require("express");
var app = express();
var PORT = process.env.PORT || 8080; // default port 8080
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

var urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

function generateRandomString() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 6; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

app.get("/", function(req, res){
  res.end("Hello!");
});

app.get("/urls", function(req, res){
  let templateVars = { urls: urlDatabase };
  res.render("urls_index", templateVars);
});

app.get("/urls/new", function(req, res){
  res.render("urls_new");
});

app.post("/urls", function(req, res){
  var randomString = generateRandomString();
  urlDatabase[randomString] = req.body.longURL;  // debug statement to see POST parameters
  res.redirect("/urls");         // Respond with 'Ok' (we will replace this)
});

app.get("/urls/:id", function(req, res){
  let templateVars = { shortURL: req.params.id, url: urlDatabase[req.params.id]};
  res.render("urls_show", templateVars);
});

app.get("/u/:shortURL", function(req, res){
  let longURL = urlDatabase[req.params.shortURL]
  res.redirect(longURL);
});

app.post("/urls/:id/delete", function(req, res){
  delete urlDatabase[req.params.id];
  res.redirect("/urls")
})

app.get("/urls.json", function(req, res) {
  res.json(urlDatabase);
});

app.get("/hello", function(req, res){
  res.end("<html><body>Hello <b>World</b></body></html>\n");
});


app.listen(PORT, function(){
  console.log(`Example app listening on port ${PORT}!`);
});