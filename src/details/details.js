import { addToCartFunction } from './cart';

const recommendedWrapper = document.querySelector('.recommended-wrapper');
const detailSection = document.querySelector('.product-details-section');
const spinner = document.querySelector('.spinner')


const queryString = document.location.search;
const params  = new URLSearchParams(queryString);
const id = params.get("id");

const getGames = async () => {
    try{
      const response = await fetch(`${import.meta.env.VITE_API_KEY2}/${id}`)
      const data = await response.json()
      return data
    } catch(error){
      console.log(error)
    }
  
  }

  const getFeatured = async () => {
    try{
      const response = await fetch(`${import.meta.env.VITE_API_KEY}`)
      const featured = await response.json()
      return featured
    } catch(error){
      console.log(error)
    }
  
  }

function renderDetails(data){


    const priceHtml = data.price_html
    const parser = new DOMParser();
    const priceElement = parser.parseFromString(priceHtml, 'text/html').body.firstChild;
    const formattedPrice = priceElement.textContent;


    const detailsWrapper = document.createElement('div')
    detailsWrapper.textContent = ''
    detailsWrapper.insertAdjacentHTML("beforeend", `
<div class="details-container"> 
    <div class="details-img-container">
        <img src=${data.images[0].src} class="img img-details-page" alt="game-cover">
    </div>
    <article class="main-info">
        <h3>${data.name}</h3>
        <p>${data.attributes[0].terms[0].name}</p>
        <p>Released ${data.attributes[1].terms[0].name}</p>
    </article>
    <div class="product-details-info">
        <p class="product-details-price">${formattedPrice}</p>
        <button class="cta add-to-cart-cta" id=${data.id}>Add to cart</button>
        <p class="product-details-digital-info">All games are sold as digital copies</p>
    </div>
    <article class="description">
        <h3>Description</h3>
        <p>${data.description}
        </p>
     </article>
     <article class="secondary-info">
        <h3>4K, VR</h3>
        <p>${data.short_description}
        </p>
    </article>  
    </div>`)
    detailSection.appendChild(detailsWrapper)

    const addToCart = document.querySelectorAll('.add-to-cart-cta')
    addToCart.forEach(button => button.addEventListener('click',(event)=>{

        addToCartFunction(data)
        //addToCartFunction(foundGame)
        button.disabled = true;
    
        button.textContent='Item added to cart!'
        button.style.backgroundColor = 'green'
        setTimeout(()=>{button.textContent='Add to cart', button.style.backgroundColor='#BE9C37',  button.disabled = false},1000)
    }))
    
} 


function renderRecommendedSection(data) {
    recommendedWrapper.textContent = ''
    data.forEach(game => {
        const priceHtml = game.price_html
        const parser = new DOMParser();
        const priceElement = parser.parseFromString(priceHtml, 'text/html').body.firstChild;
        const formattedPrice = priceElement.textContent;
    
        recommendedWrapper.insertAdjacentHTML("beforeend", `<div class="game-card recommended-game-card">
        <img class="game-cover-img" src=${game.images[0].thumbnail} alt="game-cover-boxer">
        <p class="game-title">${game.name}</p>
        <p class="price">${formattedPrice}</p>
        <a class="cta cta-small" href="details.html?id=${game.id}">Details</a>
    </div>`)
    })


}


const renderPage = async () => {
    try{
      spinner.classList.add('show')
      const data = await getGames()
      const featured = await getFeatured()
      renderDetails(data)
      renderRecommendedSection(featured)
    } catch(error){
      console.log(error)
    }finally{
      spinner.classList.remove('show')
    }
  }

  
  
  
renderPage()
