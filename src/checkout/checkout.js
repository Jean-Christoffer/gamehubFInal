import {totalPay,clearCart} from './cart'
const clearField = document.querySelectorAll('.clear')


const cssValues = [
  '.price-info-total',
  '.total-price-checkout',
  '.checkout-form',
  '.snackBar-checkout',
  '#full-name',
  '#mail',
  '#cc',
  '#month-year',
  '#cvc',

]
const values = cssValues.map(value => document.querySelector(value))

const [
  total,
  totalPriceCheckout,
  checkOutForm,snackBar,
  fullName,
  mail,
  ccValue,
  monthYear,
  cvc,

] = values

let fetchedProducts = JSON.parse(sessionStorage .getItem("fetchedProducts")) || [];



const amount =  () => {
    totalPay(fetchedProducts)
    totalPriceCheckout.textContent = ''
    totalPriceCheckout.textContent = total.textContent
}           

checkOutForm.addEventListener('submit',(event)=>{
  
  event.preventDefault()
  const name = fullName.value.toLowerCase().trim()
  const email = mail.value.toLowerCase().trim()
  const cc = ccValue.value
  const date = monthYear.value
  const cvC = cvc.value


  const regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g; 
  const patternMatches = regEx.test(email);
  
  name.length > 0 ? removeErrorMessage(fullName) : errorMessage(fullName,'Please enter a name')
  patternMatches ? removeErrorMessage(mail) : errorMessage(mail, 'Please enter a valid email')
  cc.length === 16 ?  removeErrorMessage(ccValue) : errorMessage(ccValue, 'Please enter a 16-digit cc number')

  date.length ?  removeErrorMessage(monthYear) : errorMessage(monthYear, 'Please enter a valid date')
  cvC.length === 3 ? removeErrorMessage(cvc) : errorMessage(cvc, 'Please enter a valid cvc number')
  

  if( name.length > 0 && patternMatches && cc.length === 16 && date.length > 0 && cvC.length === 3){
    clearField.forEach(input => input.value = '')
    clearCart()
    showSnackBar('Purchase successful! Enjoy your new game :)')
  }
  
})



function showSnackBar(message){
  snackBar.textContent = message
  snackBar.classList.add('reveal')
  setTimeout(()=>{
    snackBar.classList.remove('reveal')
  },4000)

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




function updateCheckout(){
  let buttons = document.querySelectorAll('.fa-solid')

  buttons.forEach(button => {
   button.addEventListener('click',()=>{
     amount()
   })
  })
 }
updateCheckout()
amount()