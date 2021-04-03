let createField = document.getElementById("create-field")
let createField2 = document.getElementById("create-field2")

let errors = []

let validation = function(){
  // if (createField.value.length < 3) {errors.push("İsim ve soyisminiz 3 karakterden kısa olamaz.")}
  if (createField2.value.length < 1) {errors.push("Yorumunuz boş bırakılamaz.")}
}
///

function alertTimeoutSuccess(mymsg,mymsecs)
{
  var myelement = document.createElement("div");
  myelement.className = "animate__animated animate__bounceOut"
  myelement.setAttribute("style","animation-duration: 1.4s; background: rgba(30, 139, 195, 0.8); color:white; width: 250px;height: 100px;position: absolute;top:0;bottom:0;left:0;right:0;margin:auto;border: 4px solid lightblue; border-radius: 30px; font-family:arial;font-size:19px;font-weight:bold;display: flex; align-items: center; justify-content: center; text-align: center;");
  myelement.innerHTML = mymsg;
  setTimeout(function(){
  myelement.parentNode.removeChild(myelement);
 },mymsecs);
 document.body.appendChild(myelement);
}

function alertTimeoutFail(mymsg,mymsecs)
{
  var myelement = document.createElement("div");
  myelement.className = "animate__animated animate__bounceOut"
  myelement.setAttribute("style","animation-duration: 1.4s; background: rgba(255, 0, 0, 0.8); color:white; width: 250px;height: 100px;position: absolute;top:0;bottom:0;left:0;right:0;margin:auto;border: 4px solid lightblue; border-radius: 30px; font-family:arial;font-size:19px;font-weight:bold;display: flex; align-items: center; justify-content: center; text-align: center;");
  myelement.innerHTML = mymsg;
  setTimeout(function(){
  myelement.parentNode.removeChild(myelement);
 },mymsecs);
 document.body.appendChild(myelement);
}


document.getElementById("create-form").addEventListener("submit", function(e){
  validation()
  console.log(errors.length)
  console.log(errors)
    if (errors.length == 0) {
    errors = []
    e.preventDefault()
    alertTimeoutSuccess("Yorumunuz gönderildi", 1100)
    axios.post('/create-item', {text: createField.value ,text2: createField2.value}).then(function () {
      createField.value = ""
      createField2.value = ""
      createField.placeholder = "İsminiz."
      createField2.placeholder = "Sorunuz."
      createField.focus()
      }).catch(function() {
      console.log("Please try again later.")
      })
  }else{
    errors = []
    e.preventDefault()
    alertTimeoutFail("Gönderim başarısız." ,3000)
    createField.value = ""
    createField2.value = ""
    createField.placeholder = "İsminiz"
    createField2.placeholder = "Yorumunuz boş bırakılamaz."
    // createField2.placeholder = "Yorumunuz on karakterden uzun olmalıdır."
    createField2.focus()
  }
  
})

function ChangeSource(Button){
    if(Button==1){
        FrameId.src='https://player.vimeo.com/video/532559339?autoplay=1&title=0&byline=0&portrait=0',
        document.getElementById("lang-button1").className = "btn btn-primary"
        document.getElementById("lang-button2").className = "btn btn-secondary";
    } else 
    if(Button==2){
        FrameId.src='https://player.vimeo.com/video/532561737?autoplay=1&title=0&byline=0&portrait=0',
        document.getElementById("lang-button2").className = "btn btn-primary"
        document.getElementById("lang-button1").className = "btn btn-secondary";
    } 
    }

    //