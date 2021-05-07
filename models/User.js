const bcrypt = require("bcryptjs")
const usersCollection = require('../db').db().collection("users")
const validator = require("validator")
const md5 = require('md5')

let User = function(data) {
  this.data = data
  this.errors = []
}

User.prototype.cleanUp = function() {
  if (typeof(this.data.username) != "string") {this.data.username = ""}
  if (typeof(this.data.email) != "string") {this.data.email = ""}
  if (typeof(this.data.password) != "string") {this.data.password = ""}
  if (typeof(this.data.brans) != "string") {this.data.brans = ""}
  if (typeof(this.data.sehir) != "string") {this.data.sehir = ""}
  if (typeof(this.data.tckimlik) != "string") {this.data.tckimlik = ""}

  // get rid of any bogus properties
  this.data = {
    username: this.data.username.trim(),
    email: this.data.email.trim().toLowerCase(),
    password: this.data.password,
    brans: this.data.brans,
    sehir: this.data.sehir,
    tckimlik: this.data.tckimlik
    
  }
}

User.prototype.validate = function() {
  return new Promise(async (resolve, reject) => {
    if (this.data.username == "") {this.errors.push("Kullanıcı adı girmelisiniz.")}
    // if (this.data.username != "" && !validator.isAlphanumeric(this.data.username)) {this.errors.push("Kullanıcı adı sadece harf ve numara barındırabilir.")}
    if (!validator.isEmail(this.data.email)) {this.errors.push("Geçerli bir mail adresi girmelisiniz.")}
    if (this.data.password == "") {this.errors.push("Şifre girmelisiniz.")}
    if (this.data.password.length > 0 && this.data.password.length < 8) {this.errors.push("Oluşturulan şifre en az sekiz karakterden oluşmalıdır.")}
    if (this.data.password.length > 50) {this.errors.push("Oluşturulan şifre elli karakteri geçemez.")}
    if (this.data.username.length > 0 && this.data.username.length < 3) {this.errors.push("Kullanıcı adı üç karakterden az olamaz.")}
    if (this.data.username.length > 50) {this.errors.push("Kullanıcı adı otuz karakteri geçemez.")}
  
    // Only if username is valid then check to see if it's already taken
    // if (this.data.username.length > 2 && this.data.username.length < 31 && validator.isAlphanumeric(this.data.username)) {
    //   let usernameExists = await usersCollection.findOne({username: this.data.username})
    //   if (usernameExists) {this.errors.push("Bu kullanıcı adı kullanılıyor.")}
    // }
  
    // Only if email is valid then check to see if it's already taken
    if (validator.isEmail(this.data.email)) {
      let emailExists = await usersCollection.findOne({email: this.data.email})
      if (emailExists) {this.errors.push("Bu e-posta adresi zaten kullanılıyor.")}
    }
    resolve()
  })
}

User.prototype.login = function() {
  return new Promise((resolve, reject) => {
    this.cleanUp()
    usersCollection.findOne({email: this.data.email}).then((attemptedUser) => {
      if (attemptedUser && bcrypt.compareSync(this.data.password, attemptedUser.password)) {
        this.data = attemptedUser
        console.log(this.data, attemptedUser.password);
        this.getAvatar()
        resolve("Tebrikler!")
      } else {
        reject("Geçersiz kullanıcı adı / şifre.")
      }
    }).catch(function() {
      reject("Lütfen daha sonra tekrar deneyin.")
    })
  })
}

User.prototype.register = function() {
  return new Promise(async (resolve, reject) => {
    // Step #1: Validate user data
    this.cleanUp()
    await this.validate()
  
    // Step #2: Only if there are no validation errors 
    // then save the user data into a database
    if (!this.errors.length) {
      // hash user password
      let salt = bcrypt.genSaltSync(10)
      this.data.password = bcrypt.hashSync(this.data.password, salt)
      await usersCollection.insertOne(this.data)
      this.getAvatar()
      resolve()
    } else {
      reject(this.errors)
    }
  })
}

User.prototype.getAvatar = function() {
  this.avatar = `https://gravatar.com/avatar/${md5(this.data.email)}?s=128`
}


module.exports = User