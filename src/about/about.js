
const tl = gsap.timeline({defaults:{duration:0.4}})
function loader(){
  
  tl.from(".about-text",{x:-30, delay:0.1, ease:'linear', autoAlpha:0})
  .from(".location-container",{x:30, delay:0.5, ease:'linear', autoAlpha:0})
  .from('.universe-img', {y:'100%', delay:0.5, ease:'linear', autoAlpha:0})
  .from('.universe-of-games', {y:'-100%', delay:0.5, ease:'linear', autoAlpha:0})


}

window.addEventListener('load',function(event) {
  loader()
})



