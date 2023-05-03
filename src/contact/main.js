import  {renderCart}  from './cart.js'

const cssValues = [
  '.hamburger-menu',
  '.nav-menu',
  '.overlay',
  '.cart-hover-amount',
  '.cart-icon',
  '.overlay-body',
  '.cart-menu',
]
const querySelected = cssValues.map(value => document.querySelector(value))
const [
  hamburgerMenu,
  nav,
  overlay,
  cartHoverAmount,
  cartButton,
  body,
  cartContainer,
 ] = querySelected


hamburgerMenu.addEventListener('click', function(){
    hamburgerMenu.classList.toggle('active');
    nav.classList.toggle('active');
})

cartButton.addEventListener('click', function(){
    cartButton.classList.toggle('active');
    cartContainer.classList.toggle('active');
    overlay.classList.toggle('active')
    body.classList.toggle('stop-scrolling')
    cartHoverAmount.classList.toggle('hide')
    if(cartContainer.className.includes('active')){
      renderCart()
    } 
})

overlay.addEventListener('click',()=>{
  cartButton.classList.toggle('active');
  cartContainer.classList.toggle('active');
  overlay.classList.toggle('active')
  body.classList.toggle('stop-scrolling')
  document.querySelector('.cart-hover-amount').classList.toggle('hide')
})






