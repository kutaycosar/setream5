const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('connect-flash')
const app = express()
let mongodb = require('mongodb')
const user = require('./controllers/userController')
let db = require('./db').db().collection("comments")
let data 

let sessionOptions = session({
  secret: "JavaScript is sooooooooo coool",
  store: new MongoStore({client: require('./db')}),
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 1000 * 60 * 60 * 24, httpOnly: true}
})
//
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

app.post('/create-item',function(req,res){
  date = new Date()
  data = {
      isim: req.body.text,
      yorum: req.body.text2,
      date: date.toLocaleString()
  }

  db.insertOne(data, function(err, info){
      res.json(info.ops[0])
  })
  
})

app.post('/create-cevap',function(req,res){
  

  db.insertOne(cevap, function(err, info){
      res.json(info.ops[0])
  })
  
})

app.post('/delete-item', function(req, res) {
  db.deleteOne({_id: new mongodb.ObjectId(req.body.id)}, function() {
    res.send("Success")
  })
})

app.use('/', router)

module.exports = app