import axios from 'axios'
import { getBanner, getFeatured, getProducts, getUser } from './network/network';

let counter = 0;
let pauseCarousel = false
var carouselSlide, images, slideWidth, length


async function Carousel(){
  
  if(pauseCarousel){
    //console.log(pauseCarousel);
    return
  }

  carouselSlide = document.querySelector('#car-wrap');
  images = document.querySelectorAll('.product-link')
  slideWidth = carouselSlide?.children[0]?.clientWidth;
  length = document.querySelectorAll('#car-wrap .product-link').length-1
  counter++

  if(counter >=length+1){
    counter = 0
  }
  
  MoveCarousel(images, slideWidth, counter)
}

async function forward(){
  pauseCarousel = true
  carouselSlide = document.querySelector('#car-wrap');
  images = document.querySelectorAll('.product-link')
  slideWidth = carouselSlide?.children[0]?.clientWidth;
  length = document.querySelectorAll('#car-wrap .product-link').length-1
  counter++
  images[0].ontransitionstart= (e)=>{
    //console.log("START");
    //pauseCarousel = true
  }
  images[0].ontransitionend = (e)=>{
    pauseCarousel = false
  }

  if(counter >=length+1){
    counter = 0
  }
  
  MoveCarousel(images, slideWidth, counter)
  
}


async function backward(){
  pauseCarousel = true
  carouselSlide = document.querySelector('#car-wrap');
  images = document.querySelectorAll('.product-link')
  slideWidth = carouselSlide?.children[0]?.clientWidth;
  length = document.querySelectorAll('#car-wrap .product-link').length-1
  counter--
  if(counter <0){
    counter = length
  }
  
  MoveCarousel(images, slideWidth, counter)
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

function MoveCarousel(_images, _width, _count){
  for (let i = 0; i < _images.length; i++) {
    const element = _images[i];
    element.style.transform = `translateX(${-_width * (_count)}px)`;
  }
}

export {
    getContent,
    forward,
    backward,
    Carousel
}