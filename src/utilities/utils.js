import axios from 'axios'
import { getBanner, getFeatured, getProducts, getUser } from './network/network';

let counter = 0;
let pauseCarousel = false

async function Carousel(){
  
  if(pauseCarousel){
    //console.log(pauseCarousel);
    return
  }

  const carouselSlide = document.querySelector('#car-wrap');
  //const car = carouselSlide.cloneNode(true)
  const images = document.querySelectorAll('.product-link')
  const slideWidth = carouselSlide?.children[0]?.clientWidth;
  //element.style.transform = `translateX(${-slideWidth * (counter)}px)`;
  let length = document.querySelectorAll('#car-wrap .product-link').length-1
  counter++

  if(counter <length+1){
    for (let i = 0; i < images.length; i++) {
      const element = images[i];
      element.style.transform = `translateX(${-slideWidth * (counter)}px)`;
    }
    
  }
  else{
   // console.log("ELSE");
    for (let i = 0; i < images.length; i++) {
      const element = images[i];

      counter = 0
      element.style.transform = `translateX(${-slideWidth * (counter)}px)`;
    }
  }
}

async function forward(){
  pauseCarousel = true

  const carouselSlide = document.querySelector('#car-wrap');
  const images = document.querySelectorAll('.product-link')
  const slideWidth = carouselSlide.children[0].clientWidth;
  let length = document.querySelectorAll('#car-wrap .product-link').length-1
  counter++

  if(counter <length+1){
    images[0].ontransitionstart= (e)=>{
      //console.log("START");
      //pauseCarousel = true
    }
    images[0].ontransitionend = (e)=>{
      pauseCarousel = false
    }

    for (let i = 0; i < images.length; i++) {
      const element = images[i];
      element.style.transform = `translateX(${-slideWidth * (counter)}px)`;
    }
    
  }
  else{
   // console.log("ELSE");
    for (let i = 0; i < images.length; i++) {
      const element = images[i];

      counter = 0
      element.style.transform = `translateX(${-slideWidth * (counter)}px)`;
    }
  }
  
}


async function backward(){
  pauseCarousel = true

  const carouselSlide = document.querySelector('#car-wrap');
  const images = document.querySelectorAll('.product-link')
  const slideWidth = carouselSlide.children[0].clientWidth;
  let length = document.querySelectorAll('#car-wrap .product-link').length-1
  counter--
    if(counter >= 0){
      //console.log("NORMAL");
      for (let i = 0; i < images.length; i++) {
        const element = images[i];
        element.style.transform = `translateX(${-slideWidth * (counter)}px)`;
        
      }
      
    }
    else{
    //console.log("ELSE");
    for (let i = 0; i < images.length; i++) {
      const element = images[i];
      // console.log(element);
      //element.style.transition = `transform 0.5s ease`;
      counter = length
      element.style.transform = `translateX(${-slideWidth * (counter)}px)`;
    }
  }
}

async function getContent(){
  let resUser = await getUser()
  let resBanner = await getBanner()
  let resFeatured = await getFeatured()
  let resProducts = await getProducts()
  return {
    user: resUser.data.user, 
    banner: resBanner.data.result,
    featured: resFeatured.data,
    products: resProducts.data
  }
}



export {
    getProducts,
    getFeatured,
    getUser,
    getBanner,
    getContent,
    forward,
    backward,
    Carousel
}