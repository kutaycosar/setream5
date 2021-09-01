const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('connect-flash')
const app = express()
let mongodb = require('mongodb')
const user = require('./controllers/userController')
let dbSoruCevap = require('./db').db().collection("sorucevap")
let db = require('./db').db().collection("comments")
const { MongoClient } = require("mongodb");
const uri =
  "mongodb://todoAppUser:0024882aaa@cluster0-shard-00-00.m1hmo.mongodb.net:27017,cluster0-shard-00-01.m1hmo.mongodb.net:27017,cluster0-shard-00-02.m1hmo.mongodb.net:27017/Complex-App?ssl=true&replicaSet=atlas-tj1li7-shard-0&authSource=admin&retryWrites=true&w=majority";
const client = new MongoClient(uri);


let data 
let cevapData

let sessionOptions = session({
  secret: "JavaScript is sooooooooo coool",
  store: new MongoStore({client: require('./db')}),
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 1000 * 60 * 60 * 24, httpOnly: true}
})

app.use(sessionOptions)
app.use(flash())

const router = require('./router')

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(express.static('public'))
app.set('views', 'views')
app.set('view engine', 'ejs')



function passwordProtected(req, res, next){
  res.set('WWW-Authenticate', 'Basic realm="Setream app", charset="UTF-8')
  if (req.headers.authorization == "Basic c2V0YWRtaW46NDMyMTA=") {
     next() 
  }else{
      res.status(401).send("Yanlış şifre girildi")
  }
}

app.get('/yorumlar',passwordProtected, function(req,res){
  db.find().sort({_id:-1}).toArray(function(err, items){
    res.render('yorumlar.ejs', {
        data: items
    })  
  })
  
})

app.get('/admin',passwordProtected, function(req,res){
  db.find().sort({_id:-1}).toArray(function(err, items){
    res.render('admin-panel.ejs', {
        data: items
    })  
  })
  
})

//karsilama.ejs modal in gidecegi sayfa
app.get('/video', function(req,res){
  
  res.redirect('/home')
})

app.get('/video2', function(req, res){
  res.render('home-dashboard2.ejs')
})

app.post('/create-item',function(req,res){
  date = new Date()
  data = {
      isim: req.session.user.username,
      yorum: req.body.text2,
      date: date.toLocaleString()
  }

  db.insertOne(data, function(err, info){
      res.json(info.ops[0])
  })
  
})
// 
// app.post('/create-cevap',function(req,res){
  

//   db.insertOne(cevap, function(err, info){
//       res.json(info.ops[0])
//   })
  
// })

app.post('/delete-item', function(req, res) {
  db.deleteOne({_id: new mongodb.ObjectId(req.body.id)}, function() {
    res.send("Success")
  })
})

app.post('/soru-cevapla', function(req, res) {
  console.log("burdayiz")
  if (!dbSoruCevap.find(req.session.user.username)) {
    cevapData = 
    {
    isim: req.session.user.username,
    cevap: req.body.cevap,
    }

    dbSoruCevap.insertOne(cevapData, function(err, info){
      res.json(info.ops[0])
      
    })
    
  }
  
  
})

app.post('/stream', function(req, res) {
  console.log("burssdayiz")
  
  
  
})



app.use('/', router)

module.exports = app