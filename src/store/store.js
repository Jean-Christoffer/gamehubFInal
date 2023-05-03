import { addToCartFunction } from './cart.js';

const cssValues = [
  '.game-section',
  '.search-container',
  '.search',
  '.product-count',
  '.filter',
  '.game-store-title',
  '.spinner',
]
const querySelected = cssValues.map(value => document.querySelector(value))
const [
  gameSection,
  searchForm,
  search,
  productCount,
  select,
  storeTitle,
  spinner,
   ] = querySelected

let searchValue
let selectValue

const getGames = async () => {
  try{
    const response = await fetch(`${import.meta.env.VITE_API_KEY2}`)
    const data = await response.json()
    return data
  } catch(error){
    console.log(error)
  } 

}

function storeRow(value, inputValue, gameList){

  const cleaner = value.trim().toLocaleLowerCase()

  const search = gameList.filter(game => game.name.toLocaleLowerCase().replaceAll(' ', '')
  .includes(cleaner))
  
  const filtered = gameList.filter(game => game.attributes[0].terms[0].name.toLocaleLowerCase()
  .includes(cleaner))

  let result = search

  if(inputValue === 'selectResult'){
    result = filtered
  
  }
  if(inputValue === 'searchResult'){
    result = search
  }
  gameSection.textContent = ''

  result.map(game => {

    const priceHtml = game.price_html

    const parser = new DOMParser();
    const priceElement = parser.parseFromString(priceHtml, 'text/html').body.firstChild;
    const formattedPrice = priceElement.textContent;

    
      productCount.textContent = ''

      const gameCard = document.createElement('div')
      gameCard.className = 'game-card'
  
      const detailsAnchor = document.createElement('a')
      detailsAnchor.href= `./details/details.html?id=${game.id}`
  
      const gameImage = document.createElement('img')
      gameImage.src=`${game.images[0].thumbnail}`
      gameImage.className = 'game-cover-img'
      gameImage.alt = 'game-cover-image'
      detailsAnchor.appendChild(gameImage)
  
      const gameTitle = document.createElement('p')
      gameTitle.className = 'game-title'
      gameTitle.textContent = `${game.name}`
      detailsAnchor.appendChild(gameTitle)
  
      const priceAndPlatform = document.createElement('div')
      priceAndPlatform.className='price-platform-container'
      detailsAnchor.appendChild(priceAndPlatform)
  
      const price = document.createElement('p')
      price.className = 'price'
      price.textContent = `${formattedPrice}`
      priceAndPlatform.appendChild(price)
  
     const platform = document.createElement('p')
      platform.className = 'platform'
      platform.textContent = `${game.attributes[0].terms[0].name}`
      priceAndPlatform.appendChild(platform)
  
      gameCard.appendChild(detailsAnchor)
  
      const addToCartButton = document.createElement('button')
      addToCartButton.className = 'cta cta-small cta-add-to-cart'
      addToCartButton.id = `${game.id}`
      addToCartButton.textContent = 'Add to cart'
      gameCard.appendChild(addToCartButton)

      gameSection.appendChild(gameCard)
    
    })

    if(result.length === 0){
      gameSection.textContent = 'No games found'
    }
    productCount.textContent = `${result.length} Products`

    select.value === '' ? storeTitle.textContent = `All games` :  storeTitle.textContent = `${select.value}`
    const addToCart = document.querySelectorAll('.cta-add-to-cart')

    addToCart.forEach(button => button.addEventListener('click',(event)=>{
      let foundGame = gameList.find(game => game.id === Number.parseInt(event.currentTarget.id))
      addToCartFunction(foundGame)

      button.disabled = true;

    button.textContent='Item added to cart!'
    button.style.backgroundColor = 'green'
    setTimeout(()=>{button.textContent='Add to cart', button.style.backgroundColor='#BE9C37',  button.disabled = false},1000)
  
}))
    
}


const renderPage = async (value = '', inputValue = '') => {
  try{
    spinner.classList.toggle('show')
    const data = await getGames()
    storeRow(value, inputValue , data)
  } catch(error){
    console.log(error)
  }finally{
    spinner.classList.toggle('show')
  }
}

searchForm.addEventListener('submit',(event)=>{
  event.preventDefault()
  searchValue = search.value.trim().toLowerCase().replaceAll(' ', '')
  
  renderPage(searchValue,'searchResult')
  search.value = ''
  select.value = ''
})

select.addEventListener('change',()=>{
  selectValue = select.value
  renderPage(selectValue,'selectResult')
})




renderPage()
