const User = require('../models/User')

exports.login = function(req, res) {
  let user = new User(req.body)
  user.login().then(function(result) {
    req.session.user = {avatar: user.avatar, username: user.data.username, email: user.data.email}
    console.log(req.session.user.email);
    req.session.save(function() {
      res.redirect('/home')
    })
  }).catch(function(e) {
    req.flash('errors', e)
    req.session.save(function() {
      res.redirect('/home')
    })
  })
}

exports.logout = function(req, res) {
  req.session.destroy(function() {
    res.redirect('/home')
  })
}

exports.register = function(req, res) {
  let user = new User(req.body)
  user.register().then(() => {
    req.session.user = {username: user.data.username, email: user.data.email ,avatar: user.avatar}
    req.session.save(function() {
      res.redirect('/home')
    })
  }).catch((regErrors) => {
    regErrors.forEach(function(error) {
      req.flash('regErrors', error)
    })
    req.session.save(function() {
      res.redirect('/home')
    })
  })
}

exports.home = function(req, res) {
  if (req.session.user) {
    res.render('home-dashboard', {username: req.session.user.username, email: req.session.user.email, avatar: req.session.user.avatar})
  } else {
    res.render('home-guest', {errors: req.flash('errors'), regErrors: req.flash('regErrors')})
  }
}
exports.welcome = function(req, res){
  res.render('karsilama.ejs')
}