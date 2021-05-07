const password = document.getElementById('toplantiPass')
const login = document.getElementById('toplantiLogin')
const form = document.getElementById('toplanti-giris')
const errorElement = document.getElementById('errors')
const password2 = document.getElementById('toplantiPass2')
const form2 = document.getElementById('toplanti-giris2')
const errorElement2 = document.getElementById('errors2')


form.addEventListener('submit',(e)=>{
    password.focus()
    let errors = []
    if (login.value == '' || login.value == null || login.value != 'gtd2021' || password.value == '' || password.value == null || password.value != 'gtd2021') {
        errors.push('Yanlış şifre veya login')
    }

    if (errors.length > 0) {
        e.preventDefault()
        errorElement.innerText = errors.join(', ')
    }
    
    
})

form2.addEventListener('submit',(e)=>{
    password2.focus()
    let errors= []
    if (password2.value == '' || password2.value == null || password2.value != 'gtd2021') {
        errors.push('Yanlış şifre')
    }

    if (errors.length > 0) {
        e.preventDefault()
        errorElement2.innerText = errors.join(', ')
    }
    
    
})