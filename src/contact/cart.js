const loader = document.querySelector('.spinner')
const cartContainer = document.querySelector('.cart-items')
const getGames = async () => {
  try {
    const fetchedProducts = JSON.parse(sessionStorage.getItem("fetchedProducts")) || [];
    if (fetchedProducts.length > 0) {
      console.log("Using sessionStorage no need to fetch");
      return fetchedProducts;
    }

    console.log("Now i need to fetch");
    const response = await fetch(`${import.meta.env.VITE_API_KEY2}`);
    const games = await response.json();
    sessionStorage.setItem("fetchedProducts", JSON.stringify(games));
    return games;
  } catch (error) {
    console.log(error);
    return [];
  }

}

let cart = JSON.parse(sessionStorage .getItem("data")) || [];
let amount = JSON.parse(sessionStorage .getItem("amountItems")) || 0;
document.querySelector('.cart-hover-amount').textContent = amount

function addToCartFunction(id){
    let selectedItem = id;
    let search = cart.find((game) => game.id === selectedItem.id);
  
  
    if (search === undefined) {
      cart.push({
        id: selectedItem.id,
        quantity: 1,
      });
    } else {
      search.quantity += 1;
    }
    amount ++

    sessionStorage .setItem("data", JSON.stringify(cart));
    sessionStorage .setItem("amountItems", JSON.stringify(amount));
    document.querySelector('.cart-hover-amount').textContent = amount
}



function generateCart (data = fetchedProducts){
  document.querySelector('.cart-hover-amount').textContent = ''

    let hoverAmount

    if(cart.length > 0){
      return (
        cartContainer.textContent = '',
        hoverAmount = cart.reduce((a,b)=>{
          return a + b.quantity
        },0),
  
        document.querySelector('.amount-items-cart').textContent = `${hoverAmount} Items`,
        document.querySelector('.cart-hover-amount').textContent = `${hoverAmount}`,
        
        cart.map(
        game => {
          let {id, quantity} = game;
          let search = data.find((game) => game.id === id) || [];

          const priceHtml = search.price_html
          const parser = new DOMParser();
          const priceElement = parser.parseFromString(priceHtml, 'text/html').body.firstChild;
          const formattedPrice = priceElement.textContent;
          let numbers = formattedPrice.replace('$','')
      
          
        const cartItem = document.createElement('div')
        cartItem.className = 'cart-item'

        const titleImage = document.createElement('div')
        titleImage.className = 'title-img'
        cartItem.appendChild(titleImage)

        const cartImage = document.createElement('img')
        cartImage.src = `${search.images[0].src}`
        titleImage.appendChild(cartImage)

        const searchTitle = document.createElement('p')
        searchTitle.textContent = `${search.name}`
        titleImage.appendChild(searchTitle)

        const platformInfo = document.createElement('p')
        platformInfo.className = 'info-platform'
        platformInfo. textContent = `${search.attributes[1].terms[0].name}`
        titleImage.appendChild(platformInfo)

        const price = document.createElement('p')
        price.textContent = `$${Number.parseInt(numbers) * quantity}`
        cartItem.appendChild(price)

        const amount = document.createElement('p')
        amount.textContent = `Amount ${quantity}`
        cartItem.appendChild(amount)

        const deleteButton = document.createElement('i')
        deleteButton.className = "fa-solid fa-trash"
        deleteButton.id = `${search.id}`
        cartItem.appendChild(deleteButton)
        
        cartContainer.appendChild(cartItem)
        },
      ).join(''),
      deleButtons()
  
      
       )
       
    } else{
      document.querySelector('.amount-items-cart').textContent = 'Your cart is empty'
      cartContainer.textContent = ''
      document.querySelector('.price-info-total').textContent = `Subtotal $0`
      document.querySelector('.cart-hover-amount').textContent = `0` 
    } 
  }
  

  function deleteGames(id){
    
    let selectedItem = id;
    let search = cart.find((game) => game.id === selectedItem);
    if (search === undefined) return;
    else if (search.quantity === 0) return;
    else{
      search.quantity -=1
    }
    cart = cart.filter((game)=> game.quantity !== 0)
    amount > 0 ? amount -- : amount 
    sessionStorage .setItem("amountItems", JSON.stringify(amount));
    document.querySelector('.cart-hover-amount').textContent = amount
    sessionStorage.setItem("data", JSON.stringify(cart));


    renderCart()
  }

  function deleButtons(){
    const deleteItem = document.querySelectorAll('.fa-trash')
    deleteItem.forEach(button => button.addEventListener('click', (event)=>{
    let id = Number.parseInt(event.currentTarget.id)

    deleteGames(id)
  
    }))
  }
  function clearCart(){

    sessionStorage.removeItem('data');
    cart = cart.filter((game)=> game.quantity === 0)
    document.querySelector('.total-price-checkout').textContent = `Subtotal $${0}`
    renderCart();

  }
 
  
  function totalPay(data){


    if(cart.length > 0){
      let amount = cart
      .map((game) => {

    
        let search = data.find((games) => games.id === game.id) || [];
        let priceHtml = search.price_html
        
        const parser = new DOMParser();
        const priceElement = parser.parseFromString(priceHtml, 'text/html').body.firstChild;
        let formattedPrice = priceElement.textContent;
        let numbers = formattedPrice.replace('$','')

        return game.quantity * Number.parseInt(numbers)
      })
      .reduce((a,b) => a + b, 0);
      document.querySelector('.price-info-total').textContent = `Subtotal $${amount ?? 0}`
  
    }else{
      return;
    }
    
  };

  const renderCart = async () => {
    try{
      loader.classList.add('show')
      const data = await getGames()
      generateCart(data)
      totalPay(data)
    } catch(error){
      console.log(error)
    }finally{

      loader.classList.remove('show')

    }
  }


export {addToCartFunction, renderCart, deleteGames, deleButtons, totalPay,clearCart};
