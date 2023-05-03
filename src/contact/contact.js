

const selectors = [
  '.form',
  '#name',
  '#email',
  '#subject',
  '.snackBar',
]
const querySelect = selectors.map(values => document.querySelector(values))
const [
  form,
  nameInput,
  emailInput,
  subjectInput,
  snackBar,

 
] = querySelect
const clearField = document.querySelectorAll('.clear')


form.addEventListener('submit',(event)=>{
  
  event.preventDefault()
  const name = nameInput.value.toLowerCase().trim()
  const email = emailInput.value.toLowerCase().trim()
  const subject = subjectInput.value.toLowerCase().trim()
  const regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g; 
  const patternMatches = regEx.test(email);
  
  name.length > 0 ? removeErrorMessage(nameInput) : errorMessage(nameInput,'Please enter a name')
  patternMatches ? removeErrorMessage(emailInput) : errorMessage(emailInput, 'Please enter a valid email')
  subject.length > 5 ?  removeErrorMessage(subjectInput) : errorMessage(subjectInput, 'Please provide a subject')




  if( name.length > 0 && patternMatches && subject.length > 5){
    clearField.forEach(input => input.value = '')

    showSnackBar('Thank you! we will respond shortly')
  }
 
})

function showSnackBar(message){
  snackBar.textContent = message
  snackBar.classList.add('reveal')
  setTimeout(()=>{
    snackBar.classList.remove('reveal')
  },3000)

}

function errorMessage(input, message){
  let error = input.parentElement.children[2]
  error.textContent = message
  error.classList.add('show')

}

function removeErrorMessage(input){
  let error = input.parentElement.children[2]
  error.classList.remove('show')
} 



